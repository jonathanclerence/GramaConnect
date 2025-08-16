import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase-admin';

/**
 * PUT handler to cancel a booking.
 * It verifies the user is the owner of the booking and then
 * updates the booking's status to 'CANCELLED'.
 */
export async function PUT(request: Request, { params }: { params: { id:string } }) {
  try {
    // 1. Verify the user is authenticated
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // 2. Get a reference to the booking document
    const bookingRef = db.collection('bookings').doc(params.id);
    const doc = await bookingRef.get();

    // 3. Security Check: Ensure the document exists and the user is the citizen who made the booking
    if (!doc.exists || doc.data()?.citizenId !== decodedToken.uid) {
        return NextResponse.json({ error: 'Forbidden or Not Found: You cannot cancel this appointment.' }, { status: 403 });
    }

    // 4. Update the status field to 'CANCELLED'
    await bookingRef.update({ status: 'CANCELLED' });

    return NextResponse.json({ message: 'Appointment cancelled successfully' });

  } catch (error: any) {
    console.error("Cancel Booking Error:", error);
    if (error.code === 'auth/id-token-expired') {
        return NextResponse.json({ error: 'Authentication token has expired.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
