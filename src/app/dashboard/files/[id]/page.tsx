import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../../../../firebaseAdmin";

export default async function ChatToFilePage({
  params: { id },
}: {
  params: { 
    id: string; 
  };
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  const ref = await adminDb
  .collection("users")
  .doc(userId!)
  .collection("files")
  .doc(id)
  .get();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const url = ref.data()?.downloadUrl;

  return <div>ChatToFilePage: {id}</div>;
}
