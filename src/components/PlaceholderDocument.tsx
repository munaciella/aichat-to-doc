"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const PlaceholderDocument = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/upload");
  };
  return (
    <Button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-36 h-48 lg:w-62 lg:h-72 rounded-xl bg-gray-200 drop-shadow-md text-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 cursor-pointer"
    >
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a document</p>
    </Button>
  );
};

export default PlaceholderDocument;
