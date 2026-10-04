require('dotenv').config({ path: '.env.local' });
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

async function fix() {
  const docRef = db.collection("settings").doc("site");
  const doc = await docRef.get();
  const data = doc.data();
  
  const sections = data.publicSite.homepageSections || [];
  
  if (!sections.find(s => s.key === "templates")) {
    sections.push({
      key: "templates",
      label: { id: "Templates", en: "Templates" },
      order: 2.5,
      visible: true
    });
    
    sections.sort((a, b) => a.order - b.order);
    
    await docRef.update({
      "publicSite.homepageSections": sections
    });
    console.log("Updated homepageSections to include templates!");
  } else {
    console.log("templates already exists in homepageSections.");
  }
}

fix();
