# 📄 Paperly – AI Chat to Your Documents

[**Live Site**](https://paperly.dev)  
[**Repository**](https://github.com/munaciella/aichat-to-doc)

---

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38bdf8?logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-e5e7eb)
![DaisyUI](https://img.shields.io/badge/DaisyUI-%2390cdf4)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?logo=firebase&logoColor=black)
![Clerk](https://img.shields.io/badge/Clerk-blueviolet)
![Stripe](https://img.shields.io/badge/Stripe-008cdd?logo=stripe&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-00b894)
![Pinecone](https://img.shields.io/badge/Pinecone-3d4ef4)

---

## 🧭 Table of Contents

- [💡 Overview](#-overview)
- [🔧 Tech Stack](#-tech-stack)
- [🚀 Features](#-features)
- [🛠 Installation](#-installation)
- [🔐 Environment Variables](#-environment-variables)
- [🗂 Folder Structure](#-folder-structure)
- [🧪 Usage](#-usage)
- [🔑 Authentication](#-authentication)
- [💳 Subscriptions & Payments](#-subscriptions-payments)
- [🧠 AI Chat & Embeddings](#-ai-chat-embeddings)
- [📂 File Management](#-file-management)
- [🌍 Deployment](#-deployment)
- [🔮 Upcoming Features](#-upcoming-features)
- [📄 License](#-license)

---

## 💡 Overview
**Paperly** is a fully functional SaaS application that allows users to upload documents and interact with them using AI-powered chat. It supports various document types (PDF, DOC, DOCX, TXT, etc.), provides chat memory and vector search, manages user subscriptions, and includes robust file management capabilities.

---

## 🔧 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [daisyUI](https://daisyui.com/)
- **Authentication:** [Clerk.dev](https://clerk.dev/) (OAuth, Email, Google sign-in)
- **Database:** [Firebase Firestore](https://firebase.google.com/products/firestore)
- **File Storage:** [Firebase Storage](https://firebase.google.com/products/storage)
- **Payments:** [Stripe](https://stripe.com/) (Subscriptions, Billing Portal)
- **AI & Embeddings:** [OpenAI](https://openai.com/), [Langchain](https://www.langchain.com/), [Pinecone](https://www.pinecone.io/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Features
- User authentication via Clerk (OAuth + email)
- Upload multiple file types
- File size and page count restrictions (depending on plan)
- Free & Pro subscriptions with Stripe
- Firestore database for file/user data
- Firebase Storage for document uploads
- Chat with documents powered by Langchain + OpenAI
- Memory-aware chat using message history
- Embedding generation stored in Pinecone
- Billing management with Stripe portal
- Dashboard to manage files (rename, delete, download)
- Toast notifications for actions and edge cases
- Responsive design, dark mode supported

---

## 🛠 Installation
```bash
git clone https://github.com/munaciella/aichat-to-doc.git
cd aichat-to-doc
npm install
```

---

## 🔐 Environment Variables
Create a `.env.local` file in the root with the following:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_FRONTEND_API=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET_LOCAL=
STRIPE_WEBHOOK_SECRET_PROD=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
NEXT_PUBLIC_PINECONE_INDEX_NAME=
```

---

## 🗂 Folder Structure
```bash
/app               # App router pages & layout
/components        # UI Components
/hooks             # Custom hooks (upload, subscription, etc.)
/actions           # Server actions (stripe, delete, etc.)
/lib               # Stripe, OpenAI, Firebase, Pinecone, utilities
/public            # Static assets
/styles            # Tailwind and global CSS
```

---

## 🧪 Usage
Start your development server:
```bash
npm run dev
```
- Visit `http://localhost:3000`
- Upload a document (free plan allows 2 docs, 3 messages each)
- Upgrade via Stripe to Pro for more features
- Interact with AI chatbot

---

## 🔑 Authentication
- Powered by [Clerk.dev](https://clerk.dev)
- Supports email/password, Google sign-in
- Protected routes handled via Clerk middleware
- Sessions available on both client and server

---

## 💳 Subscriptions & Payments
- Stripe integration using Checkout Sessions
- Webhooks for `checkout.session.completed`, `subscription.deleted`, etc.
- Active subscription status stored in Firestore
- Portal redirection for managing billing

---

## 🧠 AI Chat & Embeddings
- Documents are embedded with `OpenAIEmbeddings`
- Chunking via `RecursiveCharacterTextSplitter`
- Stored in Pinecone vector DB by document namespace
- Uses Langchain’s `createRetrievalChain` for contextual answers
- Chat memory is stored per document in Firestore

---

## 📂 File Management
- File limits based on subscription plan
- Documents stored in Firebase Storage
- Firestore tracks metadata and chat
- Rename, delete, and download functionality
- Toasts for feedback and errors

---

## 🌍 Deployment
- Deploy to [Vercel](https://vercel.com)
- Add environment variables in the Vercel dashboard
- Custom domain setup (e.g. `https://paperly.dev`)
- Stripe webhook endpoint points to `/webhook`
- Clerk DNS configured for `clerk.paperly.dev`

---

## 🔮 Upcoming Features
- Ultimate plan (Coming Soon):
  - Upload large files (>20 pages)
  - Unlimited messages per document
  - Advanced analytics
  - Priority support
- Waitlist for Ultimate plan
- Improved file preview
- More AI models (Claude, Gemini, etc.)

---

## 📄 License
This project is licensed under the [MIT License](/LICENSE).

---

📢 **Made with ❤️ by [Francesco.dev](https://francescovurchio-dev.netlify.app/)**
