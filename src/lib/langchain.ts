import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from  "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain} from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever} from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "../../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
});

export const indexName = 'papafam'

export async function generateDocs(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  console.log("--- Fetching the download URL from Firebase... ---");
  const firebaseRef = await adminDb
  .collection("users")
  .doc(userId)
  .collection("files")
  .doc(docId)
  .get();

  const downloadUrl = firebaseRef.data()?.downloadUrl;
  if (!downloadUrl) {
    throw new Error("Download URL not found in Firebase");
  }
  console.log(`--- Download URL fetched successfully: ${downloadUrl} ---`);

  const response  = await fetch(downloadUrl);

  const data = await response.blob();

  console.log("--- Loading PDF document... ---");
  const loader = new PDFLoader(data);
  const docs = await loader.load();

  console.log("--- Splitting document into smaller chunks... ---");
  const splitter = new RecursiveCharacterTextSplitter()

  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`--- Split into ${splitDocs.length} parts ---`);

  return splitDocs;
}

async function namespaceExists(index: Index<RecordMetadata>, namespace: string) {
    if (namespace === null) throw new Error("No namespace value provided");
    const { namespaces} = await index.describeIndexStats();
    return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized: User not authenticated");
  }

  let pineconeVectorStore;

  console.log("--- Generating embeddings... ---");
  const embeddings = new OpenAIEmbeddings();

  const index = await pineconeClient.index(indexName);
  const namespaceAlreadyExists = await namespaceExists(index, docId)

  if (namespaceAlreadyExists) {
    console.log(`--- Namespace ${docId} already exists, reusing existing embeddings... ---`);

    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  } else {
    //console.log(`--- Namespace ${docId} does not exist, generating new embeddings... ---`);
    const splitDocs = await generateDocs(docId);

    console.log(
        `--- Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store... ---`
    )

    pineconeVectorStore = await PineconeStore.fromDocuments(
        splitDocs,
        embeddings,
        {
          pineconeIndex: index,
          namespace: docId,
        }
    );

    return pineconeVectorStore;
  }
}