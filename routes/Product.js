const express = require("express");
const router = express.Router();
const { Product } = require("../config/config_test");

router.get("/", async (req, res) => {
  const snapshot = await Product.get();
  const list = snapshot.docs.map((doc) => ({
    id_producto: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

router.post("/", async (req, res) => {
  const data = req.body;
  await Product.add(data);
  res.send({ Result: "Product added Successfully" });
});

router.put("/", async (req, res) => {
  try {
    const id_producto = req.body.id_producto;
    console.log(req.body.id_producto);
    delete req.body.id_producto;
    const data = req.body;
    await Product.doc(id_producto).update(data);
    res.send({ Result: "Product updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", async (req, res) => {
  const id_producto = req.body.id_producto;
  console.log(req.body.id_producto);
  delete req.body.id_producto;
  const data = {
    estado: 0,
  };
  await Product.doc(id_producto).update(data);
  res.send({ Result: "Product deleted Successfully" });
});

// router.put("/active", async (req, res) => {
//   const id_producto = req.body.id_producto;
//   console.log(req.body.id_producto);
//   delete req.body.id_producto;
//   const data = {
//     estado: 1,
//   };
//   await Product.doc(id_producto).update(data);
//   res.send({ Result: "Product actived Successfully" });
// });

module.exports = router;
