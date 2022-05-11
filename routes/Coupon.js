const express = require("express");
const router = express.Router();
const { Coupon } = require("../config/config_test");

//Get all Coupons
router.get("/", async (req, res) => {
  const snapshot = await Coupon.get();
  const list = snapshot.docs.map((doc) => ({
    id_Coupon: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

//Create New Coupon
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await Coupon.add(data);
    res.send({ data });
  } catch (e) {
    console.log(e);
  }
});

//Search a Coupon
router.get("/uniqueC", async (req, res) => {
  try {
    const Coupones = req.query.cu;

    console.log(Coupones);

    const data = await Coupon.where("cupones", "==", Coupones).get();
    console.log(data)
    const list = data.docs.map((doc) => ({
      doc_ic: doc.id,
      ...doc.data(),
    }));

    res.send(list);
  } catch (error) {
    res.status(404).send({ error: "Error en el Try", user: null });
  }
});

//Delete a Coupon
router.delete("/", async (req, res) => {
  const Coupon_id = req.body.id_Coupon;
  console.log(req.body);
  delete req.body.id_Coupon;
  const data = {
    estado: 1,
  };
  await Coupon.doc(Coupon_id).update(data);
  res.send({ Result: "Coupon used Successfully" });
});

module.exports = router;
