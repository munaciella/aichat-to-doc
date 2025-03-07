// 'use client'

// import { useUser } from "@clerk/nextjs";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// //import { useRouter } from "next/navigation";
// import { useState } from "react";
// import {v4 as uuidv4} from "uuid";
// import { db, storage } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";

// export enum StatusText {
//     UPLOADING = "Uploading file...",
//     UPLOADED = "File uploaded successfully",
//     SAVING = "Saving file to database...",
//     GENERATING = "Generating AI embeddings, this will only take a few seconds...",
// }

// export type Status = StatusText[keyof StatusText];

// const useUpload = () => {
//   const [progress, setProgress] = useState<number | null>(null);
//   const [fileId, setFileId] = useState<string | null>(null);
//   const [status, setStatus] = useState<Status | null>(null);
//   const {user} = useUser();
//   //const router = useRouter();

//   // const handleUpload = async (file: File) => {
//   //   if (!file || !user) return;

//   //   // TODO: free/pro check

//   //   const fileIdToUploadTo = uuidv4();

//   //   const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);

//   //   const uploadTask = uploadBytesResumable(storageRef, file);

//   //   uploadTask.on("state_changed", (snapshot) => {
//   //       const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//   //       setStatus(StatusText.UPLOADING);
//   //       setProgress(percent);
//   //   }, (error) => {
//   //          console.error("Error uploading file: ", error);
//   //   }, async () => {
//   //       setStatus(StatusText.UPLOADED);

//   //       const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

//   //       setStatus(StatusText.SAVING);
//   //       await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
//   //           name: file.name,
//   //           size: file.size,
//   //           type: file.type,
//   //           downloadUrl: downloadUrl,
//   //           ref: uploadTask.snapshot.ref.fullPath,
//   //           createdAt: new Date(),
//   //       });

//   //       setStatus(StatusText.GENERATING);
//   //       // TODO: generate AI embeddings

//   //       setFileId(fileIdToUploadTo);
//   //   })
//   // }

//   const handleUpload = async (file: File) => {
//     if (!file || !user) return;
  
//     const fileIdToUploadTo = uuidv4();
//     const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
  
//     // Ensure progress updates properly
//     uploadTask.on("state_changed", (snapshot) => {
//       const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//       console.log("Upload Progress:", percent); // ✅ Check if progress updates are being logged
//       setProgress(percent);
//       setStatus(StatusText.UPLOADING);
//     });
  
//     await new Promise<void>((resolve) => {
//       uploadTask.on("state_changed", null, null, async () => {
//         resolve();
//       });
//     });
  
//     await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for UI
//     setStatus(StatusText.UPLOADED);
//     setProgress(100);
  
//     const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
  
//     await new Promise((resolve) => setTimeout(resolve, 800)); // Delay before saving status
//     setStatus(StatusText.SAVING);
//     await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       downloadUrl: downloadUrl,
//       ref: uploadTask.snapshot.ref.fullPath,
//       createdAt: new Date(),
//     });
  
//     await new Promise((resolve) => setTimeout(resolve, 1200)); // Delay before generating status
//     setStatus(StatusText.GENERATING);
  
//     await new Promise((resolve) => setTimeout(resolve, 1500)); // Allow user to see the final status
//     setFileId(fileIdToUploadTo);
//   };

//   return {
//     progress,
//     status,
//     fileId,
//     handleUpload,
//   }
// }

// export default useUpload



"use client";

import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

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
    }, 100); // 🔥 Slow down progress update every 400ms
  };

  const handleUpload = async (file: File) => {
    if (!file || !user) return;

    const fileIdToUploadTo = uuidv4();
    const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setProgress(0);
    setStatus(StatusText.UPLOADING);

    let hasSimulated = false; // 🔥 Ensure progress simulation runs only once


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

    // ✅ Only simulate progress if Firebase is skipping updates
    if (!hasSimulated && percent === 0) {
      simulateSmoothProgress(0, 100);
      hasSimulated = true; // 🔥 Prevent multiple runs
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
    await delay(800); // Delay before showing "File uploaded successfully"
    setStatus(StatusText.UPLOADED);

    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

    await delay(900); // Delay before saving to DB
    setStatus(StatusText.SAVING);
    await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
      name: file.name,
      size: file.size,
      type: file.type,
      downloadUrl: downloadUrl,
      ref: uploadTask.snapshot.ref.fullPath,
      createdAt: new Date(),
    });

    await delay(1200); // Delay before generating embeddings
    setStatus(StatusText.GENERATING);

    await delay(1500); // Allow user to see the final status
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