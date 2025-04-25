"use client";

import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export const PRO_LIMIT = 20;
export const FREE_LIMIT = 2;

const useSubscription = () => {
  const [hasActiveMembership, setHasActiveMembership] = useState<boolean | null>(null);
  const [isOverFileLimit, setIsOverFileLimit] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const { user } = useUser();

  const [snapshot, loading, error] = useDocument(
    user && doc(db, "users", user.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [filesSnapshot, filesLoading] = useCollection(
    user && collection(db, "users", user?.id, "files"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // force re-fetch by toggling refreshCount
  const refetchLimit = () => setRefreshCount((prev) => prev + 1);

  useEffect(() => {
    if (!snapshot) return;
    const data = snapshot.data();
    if (!data) return;
    setHasActiveMembership(data.hasActiveMembership);
  }, [snapshot]);

  useEffect(() => {
    if (!filesSnapshot || hasActiveMembership === null) return;

    const files = filesSnapshot.docs;
    const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

    console.log("Checking if user is over file limit", files.length, usersLimit);
    setIsOverFileLimit(files.length >= usersLimit);
  }, [filesSnapshot, hasActiveMembership, refreshCount]);

  return {
    hasActiveMembership,
    loading,
    error,
    isOverFileLimit,
    filesLoading,
    refetchLimit,
  };
};

export default useSubscription;
