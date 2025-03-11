"use server";

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  await generateEmbeddingsInPineconeVectorStore(docId);

  revalidatePath('/dashboard');
  
  return { completed: true };

}