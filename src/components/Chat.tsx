/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
//import { askQuestion, Message} from "@/actions/askQuestion"
import { Loader2Icon } from "lucide-react";
//import ChatMessage from "./ChatMessage"
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: "string";
  createdAt: Date;
};

const Chat = ({ id }: { id: string }) => {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();

  const [snapshot, loading, error] = useCollection(
    user &&
        query(
            collection(db, "users", user?.id, "files", id, "chat"),
            orderBy("createdAt", "asc")
        )
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex flex-col h-full overflow-scroll">
        {/* Chat contents */}
      <div className="flex-1 w-full">
        {/* chat messages... */}
      </div>

        <form
            onSubmit={handleSubmit}
            className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
        >
            <Input
                placeholder="Ask a Question..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-white placeholder:text-gray-700"
            />

            <Button type="submit" disabled={!input || isPending}>
                {isPending ? (
                    <Loader2Icon className="animate-spin text-indigo-600 dark:text-indigo-400" />
                ) : (
                    "Ask"
                )}
            </Button>
        </form>
    </div>
  );
};

export default Chat;
