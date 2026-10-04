const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '.env.local' });

initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});

const db = getFirestore();

async function run() {
  try {
    const docRef = db.collection('settings').doc('site');
    await docRef.set({ test: 'hello world', updatedAt: new Date() }, { merge: true });
    console.log("Write success!");
    
    const doc = await docRef.get();
    console.log("Read success:", doc.data());
  } catch (err) {
    console.error("Firebase error:", err);
  }
}

run();
