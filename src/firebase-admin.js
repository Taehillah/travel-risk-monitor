const admin = require('firebase-admin');
const serviceAccount = require('./travelrisk-f7a20-firebase-adminsdk-fbsvc-3402175d10.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://travelrisk-f7a20-default-rtdb.firebaseio.com"
});

const db = admin.database();
const auth = admin.auth();

module.exports = { db, auth };