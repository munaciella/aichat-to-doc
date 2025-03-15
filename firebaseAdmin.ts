// import { getApp, getApps, initializeApp, App, cert, ServiceAccount } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// import serviceKey from "./service_key.json";

// let app: App;

// if (!getApps().length) {
//     app = initializeApp({
//     credential: cert(serviceKey as ServiceAccount),
//   });
// } else {
//   app = getApp();
// }

// const adminDb = getFirestore(app);

// export { app as adminApp, adminDb };

import { initializeApp, getApps, getApp, App, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount(): ServiceAccount {
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  };

  for (const [key, value] of Object.entries(serviceAccount)) {
    if (!value) {
      throw new Error(`Missing Firebase environment variable: ${key}`);
    }
  }

  return serviceAccount as ServiceAccount;
}

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert(getServiceAccount()),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };