var admin = require("firebase-admin");

var serviceAccount = require("../keys/supermercado-estrella-firebase-adminsdk-72z5r-6c44190e80.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = { admin };