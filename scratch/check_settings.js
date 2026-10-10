const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account.json');
initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();
db.collection('settings').doc('global').get().then(doc => {
  console.log(JSON.stringify(doc.data().publicSite.homepageSections, null, 2));
  process.exit(0);
}).catch(console.error);
