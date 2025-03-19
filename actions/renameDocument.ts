"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebaseAdmin";
import { revalidatePath } from "next/cache";

export async function renameDocument(docId: string, newName: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  console.log(`--- Renaming document ${docId} to ${newName}... ---`);

  try {
    // ✅ Update the document name in Firestore
    await adminDb
      .collection("users")
      .doc(userId!)
      .collection("files")
      .doc(docId)
      .update({ name: newName });

    console.log(`--- Document ${docId} renamed successfully ---`);

    // ✅ Revalidate the cache to reflect the new name in UI
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error renaming document:", error);
    return { success: false, message: "Failed to rename the document." };
  }
}