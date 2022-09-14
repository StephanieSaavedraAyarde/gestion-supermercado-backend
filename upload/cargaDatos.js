const admin = require("firebase-admin");
const serviceAccount = require("../keys/supermercado-estrella-firebase-adminsdk-72z5r-6c44190e80.json");
const data = require("./data_productos-2.json");
const collectionKey = "Products"; //Name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && typeof data === "object") {
  Object.keys(data).forEach((docKey) => {
    firestore
      .collection(collectionKey)
      .doc(docKey)
      .set(data[docKey])
      .then((res) => {
        console.log("Document " + docKey + " successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}
