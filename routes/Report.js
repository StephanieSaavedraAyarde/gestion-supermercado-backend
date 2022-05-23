const express = require("express");
const router = express.Router();
const { Provider, Sale, Product, User, Coupon, Customer } = require("../config/config_test");

router.get("/provider", async (req, res) => {
    try {
        const snapshot = await Provider.get();
        const total = snapshot.size;
        res.send({ total });
    } catch (error) {
        console.log(error)
    }

});
router.get("/product", async (req, res) => {
    try {
        const snapshot = await Product.get();
        const totalp = snapshot.size;
        res.send({ totalp });
    } catch (error) {
        console.log(error)
    }

});
router.get("/user", async (req, res) => {
    try {
        const snapshot = await User.get();
        const total = snapshot.size;
        res.send({ total });
    } catch (error) {
        console.log(error)
    }

});
router.get("/coupon", async (req, res) => {
    try {
        const snapshot = await Coupon.get();
        const total = snapshot.size;
        res.send({ total });
    } catch (error) {
        console.log(error)
    }

});
router.get("/customer", async (req, res) => {
    try {
        const snapshot = await Customer.get();
        const total = snapshot.size;
        res.send({ total });
    } catch (error) {
        console.log(error)
    }

});
router.get("/sales", async (req, res) => {
    try {
        const snapshot = await Sale.get();
        const total = snapshot.size;
        res.send({ total });
    } catch (error) {
        console.log(error)
    }

});
router.get("/total", async (req, res) => {


    const querySnapshot = await Sale.get();
    const documents = querySnapshot.docs;

    let total = 0;
    for (const doc of documents) {
       
        total += doc.get('total');
    }
    res.send({ total });
    console.log("TOTAL"+total) ;


});

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