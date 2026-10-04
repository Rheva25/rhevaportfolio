const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("../../secrets/firebase-admin.json")),
    databaseURL: "https://rhevaportfolio-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

const db = admin.firestore();

async function check() {
  const doc = await db.collection("settings").doc("global").get();
  console.log(JSON.stringify(doc.data(), null, 2));
}

check();
