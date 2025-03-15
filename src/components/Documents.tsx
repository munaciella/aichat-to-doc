import { auth } from "@clerk/nextjs/server";
import PlaceholderDocument from "./PlaceholderDocument"
import { adminDb } from "../../firebaseAdmin";
import Document from "./Document";

const Documents = async () => {
  const { userId } = await auth();
      
        if (!userId) {
          throw new Error("Unauthorized: User not authenticated");
        }

        const documentsSnapshot = await adminDb
        .collection("users")
        .doc(userId)
        .collection("files")
        .get();

  return (
    <div className="flex flex-wrap mr-0 lg:mr-36 p-6 bg-gray-100 dark:bg-gray-800 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      {/* Map through the documents and display them */}
      {documentsSnapshot.docs.map((doc) => {
        const {name, downloadUrl, size} = doc.data();

        return (
          <Document
          key={doc.id}
          id={doc.id}
          name={name}
          size={size}
          downloadUrl={downloadUrl}
          />
        )
      })}

    <PlaceholderDocument />
    </div>
  )
}

export default Documents
