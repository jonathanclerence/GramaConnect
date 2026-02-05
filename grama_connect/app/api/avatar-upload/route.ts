// app/api/avatar-upload/route.ts
import { NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "@/lib/firebaseConfig";

export async function POST(req: Request) {
  try {
    const { uid, image } = await req.json();

    if (!uid || !image) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Remove "data:image/png;base64," prefix if present
    const base64Data = image.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");

    const storage = getStorage(firebaseApp);
    const fileRef = ref(storage, `avatars/${uid}`);
    await uploadBytes(fileRef, buffer);

    const downloadURL = await getDownloadURL(fileRef);

    return NextResponse.json({ url: downloadURL });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
