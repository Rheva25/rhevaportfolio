const admin = require('firebase-admin');
const serviceAccount = require('/Users/user/Documents/webonly/rhevaportfolio/serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function run() {
  const snapshot = await db.collection('articles').where('slug', '==', 'i-didnt-start-coding-to-build-websites').get();
  if (snapshot.empty) {
    console.log("Not found");
  } else {
    const doc = snapshot.docs[0].data();
    console.log("coverImage:", doc.coverImage);
  }
}
run();
