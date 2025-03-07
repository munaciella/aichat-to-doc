/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateEmbeddings(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  //await generateEmbeddingsInPineconeVectorStore(docId);

  revalidatePath('/dashboard');
  return { completed: true };

}