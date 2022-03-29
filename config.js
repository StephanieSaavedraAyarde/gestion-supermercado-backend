const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBeCIAPzlNkY6JKStoPFNqVNDxGGGWRH-c",
  authDomain: "supermercado-estrella.firebaseapp.com",
  projectId: "supermercado-estrella",
  storageBucket: "supermercado-estrella.appspot.com",
  messagingSenderId: "84186120355",
  appId: "1:84186120355:web:0b37c7c534561dc6be7f16",
  measurementId: "G-7XENZMQY1N"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Products = db.collection("Products");
module.exports = Products;
