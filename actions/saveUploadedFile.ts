"use server";

import { auth } from "@clerk/nextjs/server";
import admin from "firebase-admin";

type SaveUploadedFileParams = {
  fileId: string;
  name: string;
  size: number;
  type: string;
  downloadUrl: string;
  storageRef: string;
};

function initFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return admin.firestore();
}

export async function saveUploadedFile({
  fileId,
  name,
  size,
  type,
  downloadUrl,
  storageRef,
}: SaveUploadedFileParams) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const firestore = initFirebaseAdmin();

  const userRef = firestore.doc(`users/${userId}`);
  const userSnap = await userRef.get();

  const isPro =
    userSnap.exists && userSnap.data()?.hasActiveMembership === true;

  const maxFiles = isPro ? 20 : 2;

  const filesCollectionRef = firestore.collection(`users/${userId}/files`);
  const filesSnap = await filesCollectionRef.get();

  if (filesSnap.size >= maxFiles) {
    throw new Error("Upload limit reached. Please upgrade to Pro.");
  }

  await firestore.doc(`users/${userId}/files/${fileId}`).set({
    name,
    size,
    type,
    downloadUrl,
    ref: storageRef,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, fileId };
}