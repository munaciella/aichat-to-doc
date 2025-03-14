/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebaseAdmin";
import { Message } from "@/components/Chat";
import { generateLangchainCompletion } from "@/lib/langchain";

const FREE_LIMIT = 3;
const PRO_LIMIT = 100;

export async function askQuestion(id: string, question: string) {
    const { userId } = await auth();
    
      if (!userId) {
        throw new Error("Unauthorized: User not authenticated");
      }

      const chatRef = adminDb
      .collection("users")
      .doc(userId!)
      .collection("files")
      .doc(id)
      .collection("chat")

      const chatSnapshot = await chatRef.get();
      const userMessages = chatSnapshot.docs.filter(
        (doc) => doc.data().role === "human"
      );

      // limit PRO/FREE users

      const userMessage: Message = {
        role: "human",
        message: question,
        createdAt: new Date(),
      };

      await chatRef.add(userMessage);

      // Generate AI response
      const reply = await generateLangchainCompletion(
        id,
        question
      );

      const aiMessage: Message = {
        role: "ai",
        message: reply,
        createdAt: new Date(),
      };

      await chatRef.add(aiMessage);

      return { success: true, message: null };
}