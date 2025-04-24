"use client";

import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { generateEmbeddings } from "../actions/generateEmbeddings";

export enum StatusText {
  UPLOADING = "Uploading file...",
  UPLOADED = "File uploaded successfully",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI embeddings, this will only take a few seconds...",
}

export type Status = StatusText[keyof StatusText];

const useUpload = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const { user } = useUser();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const simulateSmoothProgress = (start: number, end: number) => {
    let currentProgress = start;
    
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= end) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleUpload = async (file: File) => {
    if (!file || !user) return;

    const fileIdToUploadTo = uuidv4();
    const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setProgress(0);
    setStatus(StatusText.UPLOADING);

    let hasSimulated = false;


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

    // Only simulate progress if Firebase is skipping updates
    if (!hasSimulated && percent === 0) {
      simulateSmoothProgress(0, 100);
      hasSimulated = true;
    } else {
      setProgress(percent);
    }

    console.log("Upload Progress:", percent);
  },
  (error) => {
    console.error("Error uploading file: ", error);
  }
);

    // Wait for upload to complete
    await new Promise<void>((resolve) => {
      uploadTask.on("state_changed", null, null, async () => {
        resolve();
      });
    });

    setProgress(null);
    await delay(800);
    setStatus(StatusText.UPLOADED);

    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

    await delay(900);
    setStatus(StatusText.SAVING);
    await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
      name: file.name,
      size: file.size,
      type: file.type,
      downloadUrl: downloadUrl,
      ref: uploadTask.snapshot.ref.fullPath,
      createdAt: new Date(),
    });

    await delay(1200);
    setStatus(StatusText.GENERATING);
    await generateEmbeddings(fileIdToUploadTo);

    await delay(1500);
    setFileId(fileIdToUploadTo);
  };

  return {
    progress,
    status,
    fileId,
    handleUpload,
  };
};

export default useUpload;