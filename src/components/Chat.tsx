"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2Icon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { askQuestion } from "../../actions/askQuestion";
import ChatMessagePage from "./ChatMessagePage";
import {toast} from "sonner"
import { useRouter } from "next/navigation";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: string;
  createdAt: Date;
};

const Chat = ({ id }: { id: string }) => {
  const { user } = useUser();
  const router = useRouter();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    bottomOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!snapshot) return;

    if (error) {
      console.error("Firestore Error:", error);
      toast.error("Failed to load chat history.", {
        style: { backgroundColor: "#DC2626", color: "white" },
      });
      return;
    }

    const lastMessage = messages.pop();

    if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...") {
      return;
    }

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data();

      return {
        id: doc.id,
        role,
        message,
        createdAt: createdAt.toDate(),
      };
    });

    setMessages(newMessages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const q = input;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "human",
        message: q,
        createdAt: new Date(),
      },
      {
        role: "ai",
        message: "Thinking...",
        createdAt: new Date(),
      },
    ]);

    startTransition(async () => {
      try {
        const { success, message } = await askQuestion(id, q);

        if (!success) {
          toast.error(message || "An error occurred. Please try again.", {
            style: { backgroundColor: "#DC2626", color: "white" },
            duration: 5000,
            action: {
              label: "Upgrade Here",
              onClick: () => router.push("/dashboard/upgrade"),
            },
          });

          setMessages((prev) =>
            prev.slice(0, prev.length - 1).concat([
              {
                role: "ai",
                message: `Whoops... ${message}`,
                createdAt: new Date(),
              },
            ])
          );
        }
      } catch (err) {
        console.error("Chat Error:", err);
        toast.error("An error occurred while processing your question.", {
          style: { backgroundColor: "#DC2626", color: "white" },
          duration: 5000,
          action: {
            label: "Upgrade",
            onClick: () => router.push("/dashboard/upgrade"),
          },
        });
        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat([
            {
              role: "ai",
              message: "An error occurred. Please try again.",
              createdAt: new Date(),
            },
          ])
        );
      }
    });
  };

  return (
    <div className="flex flex-col h-full overflow-scroll bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex-1 w-full p-4">

        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2Icon 
            data-testid="chat-loader"
            className="animate-spin h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20 text-indigo-600 dark:text-indigo-400 mt-28" />
          </div>
        ) : (
          <div className="p-5">
            {messages.length === 0 && (
              <ChatMessagePage
                key={"placeholder"}
                message={{
                  role: "ai",
                  message: "Ask me anything about the document!",
                  createdAt: new Date(),
                }}
              />
            )}

            {messages.map((message, index) => (
              <ChatMessagePage key={index} message={message} />
            ))}

            <div ref={bottomOfChatRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75 dark:bg-indigo-800/75"
      >
        <Input
          placeholder="Ask a Question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 placeholder:text-gray-700"
        />

        <Button type="submit" disabled={!input || isPending}>
          {isPending ? (
            <Loader2Icon 
            data-testid="chat-loader"
            className="animate-spin text-indigo-600 dark:text-indigo-400" />
          ) : (
            "Ask"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chat;
