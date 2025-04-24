"use client";

import { FrownIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
//import useSubscription from "../../hooks/useSubscription";
import { useSubscriptionContext as useSubscription } from "../app/context/SubscriptionContext";

const PlaceholderDocument = () => {
  //const { isOverFileLimit } = useSubscription();
  const { isOverFileLimit, filesLoading, loading } = useSubscription();
  const router = useRouter();

  // const handleClick = () => {
  //   if (isOverFileLimit) {
  //     router.push("/dashboard/upgrade");
  //   } else {
  //     router.push("/dashboard/upload");
  //   }
  // };

  const handleClick = () => {
    // Prevent navigation until data is ready
    if (filesLoading || loading) return;
  
    if (isOverFileLimit) {
      router.push("/dashboard/upgrade");
    } else {
      router.push("/dashboard/upload");
    }
  };
  return (
    <Button
      onClick={handleClick}
      disabled={filesLoading || loading}
      className="flex flex-col items-center justify-center w-36 h-48 lg:w-60 lg:h-72 rounded-xl bg-gray-200 drop-shadow-md text-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 cursor-pointer"
    >
      {/* ✅ Increased Icon Size for Visibility */}
      {isOverFileLimit ? (
        <FrownIcon className="h-12 w-12 size-auto" />
      ) : (
        <PlusCircleIcon className="h-12 w-12 size-auto" />
      )}

      {/* ✅ Ensure Text Wraps on Small Screens */}
  <p className="font-semibold text-sm lg:text-base text-center leading-tight break-words whitespace-normal w-24 lg:w-40 mt-2">
    {isOverFileLimit
      ? "Upgrade to upload more documents"
      : "Upload a document"}
  </p>
    </Button>
  );
};

export default PlaceholderDocument;
