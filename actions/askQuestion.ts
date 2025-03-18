'use server'

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebaseAdmin";
import { Message } from "@/components/Chat";
import { generateLangchainCompletion } from "@/lib/langchain";
//import { FREE_LIMIT, PRO_LIMIT } from "../hooks/useSubscription";

const PRO_LIMIT = 20;
const FREE_LIMIT = 2;

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

      const userRef = await adminDb.collection("users").doc(userId!).get();

      // limit PRO/FREE users

      if (!userRef.data()?.hasActiveMembership) {
           if (userMessages.length >= FREE_LIMIT) {
              return {
                success: false,
                message: `You'll need to upgrade to PRO to ask more than ${FREE_LIMIT} questions! 😢`,
              }
           }
      }

      if (userRef.data()?.hasActiveMembership) {
        if (userMessages.length >= PRO_LIMIT) {
          return {
            success: false,
            message: `You've reached your PRO limit of ${PRO_LIMIT} questions! 😢`,
          }
        }
      }

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