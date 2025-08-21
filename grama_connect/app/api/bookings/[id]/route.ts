import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase-admin';

/**
 * GET handler to fetch details for a single booking.
 * It verifies the user's authentication token and ensures they are
 * a participant in the booking before returning data.
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // 1. Verify the user is authenticated
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // 2. Fetch the main booking document from Firestore
    const bookingId = params.id;
    const bookingRef = db.collection('bookings').doc(bookingId);
    const doc = await bookingRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const bookingData = doc.data();

    // 3. Security Check: Ensure the requesting user is the citizen or officer involved
    if (bookingData?.citizenId !== decodedToken.uid && bookingData?.officerId !== decodedToken.uid) {
        return NextResponse.json({ error: 'Forbidden: You do not have permission to view this booking.' }, { status: 403 });
    }

    // 4. Fetch documents from the 'documents' subcollection
    const documentsSnapshot = await bookingRef.collection('documents').get();
    const documents = documentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 5. Combine and return the data
    const fullBookingDetails = { id: doc.id, ...bookingData, documents };
    return NextResponse.json(fullBookingDetails);

  } catch (error: any) {
    console.error("GET Booking Details Error:", error);
    if (error.code === 'auth/id-token-expired') {
        return NextResponse.json({ error: 'Authentication token has expired.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
