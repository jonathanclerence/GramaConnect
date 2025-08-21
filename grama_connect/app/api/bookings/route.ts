// app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import { db, auth, storage } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: Request) {
  try {
    // 1. VERIFY USER AUTHENTICATION
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    const citizenId = decodedToken.uid;

    // 2. PARSE FORM DATA (including files)
    const formData = await request.formData();
    const serviceId = formData.get('serviceId') as string;
    const officerId = formData.get('officerId') as string;
    const appointmentDate = formData.get('appointmentDate') as string; // Expects "YYYY-MM-DD"
    const appointmentTime = formData.get('appointmentTime') as string; // Expects "HH:MM AM/PM"
    const files = formData.getAll('documents') as File[];

    // Validate required fields
    if (!serviceId || !officerId || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: 'Missing required booking details' }, { status: 400 });
    }

    // 3. FETCH DENORMALIZED DATA
    const serviceDoc = await db.collection('services').doc(serviceId).get();
    const officerDoc = await db.collection('authorities').doc(officerId).get();

    if (!serviceDoc.exists || !officerDoc.exists) {
      return NextResponse.json({ error: 'Invalid service or officer ID' }, { status: 404 });
    }
    const serviceName = serviceDoc.data()?.name || 'Unknown Service';
    const officerName = officerDoc.data()?.name || 'Unknown Officer';
    const citizenName = decodedToken.name || 'Unnamed User';

    // 4. CREATE THE BOOKING DOCUMENT IN FIRESTORE
    // Convert date and time string to a proper JavaScript Date object
    const appointmentDateTime = new Date(`${appointmentDate} ${appointmentTime}`);
    
    const bookingRef = await db.collection('bookings').add({
      citizenId,
      officerId,
      serviceId,
      appointment_datetime: Timestamp.fromDate(appointmentDateTime),
      status: 'PENDING',
      qr_code_value: `gramaconnect-booking-${Date.now()}-${citizenId.slice(0, 5)}`,
      createdAt: Timestamp.now(),
      // Add denormalized data for easier display on the frontend
      citizenName,
      officerName,
      serviceName,
    });

    // 5. UPLOAD FILES TO FIREBASE STORAGE (if any)
    const fileUploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `bookings/${bookingRef.id}/${file.name}`;
      const fileRef = storage.bucket().file(filePath);
      
      await fileRef.save(buffer, {
        metadata: { contentType: file.type },
      });

      // Get a long-lived public URL for the file
      const [url] = await fileRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
      
      // Return data to be stored in the subcollection
      return {
        file_name: file.name,
        file_url: url,
        uploaded_at: Timestamp.now(),
      };
    });

    const uploadedDocuments = await Promise.all(fileUploadPromises);

    // 6. ADD DOCUMENT URLS TO A SUBCOLLECTION
    if (uploadedDocuments.length > 0) {
      const documentsCollectionRef = bookingRef.collection('documents');
      const batch = db.batch();
      uploadedDocuments.forEach(docData => {
        const docRef = documentsCollectionRef.doc(); // Auto-generate document ID
        batch.set(docRef, docData);
      });
      await batch.commit();
    }

    return NextResponse.json({
      message: 'Booking created successfully!',
      bookingId: bookingRef.id
    }, { status: 201 });

  } catch (error: any) {
    console.error('Booking Creation Error:', error);
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json({ error: 'Authentication token has expired. Please log in again.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'An internal error occurred while creating the booking.' }, { status: 500 });
  }
}
