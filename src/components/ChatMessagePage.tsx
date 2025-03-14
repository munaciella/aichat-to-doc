"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { BotIcon, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";
import { Message } from "./Chat";

const ChatMessagePage = ({ message }: { message: Message }) => {
  const isHuman = message.role === "human";
  const { user } = useUser();

  return (
    <div className={`chat ${isHuman ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          {isHuman ? (
            user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
            )
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-600 dark:bg-gray-700 rounded-full">
              <BotIcon className="text-white dark:text-gray-300 w-7 h-7" />
            </div>
          )}
        </div>
      </div>

      {/* Chat Bubble */}
      <div
        className={`chat-bubble prose rounded-lg p-3 text-sm md:text-base max-w-lg ${
          isHuman
            ? "bg-indigo-600 text-white dark:bg-indigo-400 dark:text-gray-900"
            : "bg-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
        }`}
      >
        {message.message === "Thinking..." ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin h-5 w-5 text-white dark:text-gray-300" />
          </div>
        ) : (
          <Markdown>{message.message}</Markdown>
        )}
      </div>
    </div>
  );
};

{
  /* <div className={`chat-bubble prose rounded-lg ${isHuman && "bg-indigo-600 dark:bg-indigo-400 text-white"}`}>
         {message.message === "Thinking..." ? (
            <div className="flex items-center justify-center">
                <Loader2Icon className="animate-spin h-5 w-5 text-white" />
            </div>
         ) : (
            <Markdown>{message.message}</Markdown>
         )}
      </div>
    </div>
  )
} */
}

export default ChatMessagePage;
