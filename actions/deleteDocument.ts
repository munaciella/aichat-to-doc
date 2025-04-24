"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb, adminStorage } from "../firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";
import { revalidatePath } from "next/cache";

// Deletes messages older than 30 days, but keeps the document
async function deleteOldMessages(userId: string, docId: string) {
  console.log("--- Checking for old messages to delete... ---");

  const chatRef = adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .collection("chat");

  const oldMessages = await chatRef
    .where("createdAt", "<", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .get();

  if (oldMessages.empty) {
    console.log("--- No old messages to delete ---");
    return;
  }

  console.log(`--- Deleting ${oldMessages.size} old messages... ---`);
  const batch = adminDb.batch();
  oldMessages.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log("--- Old messages deleted successfully ---");
}

// Deletes a document & its chat history
export async function deleteDocument(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  // First, delete only old chat messages
  await deleteOldMessages(userId, docId);

  // Delete all chat messages before deleting the document
  console.log("--- Deleting all chat history from Firebase... ---");

  const chatRef = adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .collection("chat");

  const chatSnapshot = await chatRef.get();

  const batch = adminDb.batch();
  chatSnapshot.forEach((doc) => batch.delete(doc.ref));

  await batch.commit();
  console.log("--- Chat history deleted successfully ---");

  // Delete the document from Firestore
  console.log("--- Deleting document from Firebase... ---");
  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .delete();

  console.log("--- Document deleted successfully ---");

  // Delete the file from Firebase Storage
  await adminStorage
    .bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(`users/${userId}/files/${docId}`)
    .delete()
    .catch((error) => console.warn("Storage deletion error:", error));

  console.log("--- File deleted successfully ---");

  // Delete the document from Pinecone
  console.log("--- Deleting document from Pinecone... ---");
  const index = pineconeClient.index(indexName);
  await index.namespace(docId).deleteAll();
  console.log("--- Document deleted successfully from Pinecone ---");

  revalidatePath("/dashboard");
}