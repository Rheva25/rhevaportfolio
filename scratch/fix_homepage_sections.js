const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

try {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  });
} catch (e) {
  if (!/already exists/.test(e.message)) {
    console.error('Firebase initialization error', e.stack);
  }
}

const db = getFirestore();

async function fixSections() {
  const settingsRef = db.collection('settings').doc('site');
  const doc = await settingsRef.get();
  
  if (!doc.exists) {
    console.log('No settings document found!');
    return;
  }
  
  const data = doc.data();
  const currentSections = data.publicSite?.homepageSections || [];
  
  const allSections = [
    { key: "hero", label: { id: "Hero", en: "Hero" }, visible: true, order: 0 },
    { key: "stack", label: { id: "Tech Stack", en: "Tech Stack" }, visible: true, order: 10 },
    { key: "templates", label: { id: "Templates", en: "Templates" }, visible: true, order: 15 },
    { key: "projects", label: { id: "Projects", en: "Projects" }, visible: true, order: 20 },
    { key: "apps", label: { id: "Apps", en: "Apps" }, visible: true, order: 30 },
    { key: "services", label: { id: "Services", en: "Services" }, visible: true, order: 40 },
    { key: "about", label: { id: "About", en: "About" }, visible: true, order: 50 },
    { key: "articles", label: { id: "Articles", en: "Articles" }, visible: true, order: 60 },
    { key: "contact", label: { id: "Contact", en: "Contact" }, visible: true, order: 70 }
  ];

  // Merge them (preferring current visibility if it exists)
  const newSections = allSections.map(s => {
    const existing = currentSections.find(c => c.key === s.key);
    if (existing) {
      return { ...s, ...existing };
    }
    return s;
  });

  await settingsRef.set({
    publicSite: {
      ...data.publicSite,
      homepageSections: newSections
    }
  }, { merge: true });
  
  console.log('Successfully updated homepage sections!');
}

fixSections().catch(console.error);
