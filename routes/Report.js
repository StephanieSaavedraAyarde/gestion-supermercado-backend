const express = require("express");
const router = express.Router();
const { Provider, Sales } = require("../config/config_test");

// router.get("/", async (req, res) => {
//   const snapshot = await Customer.get();
//   const list = snapshot.collection.lenght;
//   res.send('hello');
//   console.log('cantidad: ', list)
// });

// router.get("/provider", async (req, res) => {
//   const snapshot = await Provider.get();
//   const list = snapshot.docs.map((doc) => ({
//     id_proveedor: doc.id,
//     ...doc.data(),
//   }));
//   res.send(list.size);
//   console.log('List.size', list.size);
// });

// router.get("/sales", async (req, res) => {
//   newsRef.on("Ventas", function(snapshot) {
//     var sum = 0;
//     snapshot.forEach(function(childSnapshot) {
//       sum += (childSnapshot.val().sth);
//     });
//   console.log('Total '+sum);
//   })
// });

module.exports = router;