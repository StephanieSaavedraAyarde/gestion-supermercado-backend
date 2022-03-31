const express = require("express");
const cors = require("cors");
const Products = require("./config");
//const Provedores=require("./Provedores");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/product", async (req, res) => {
  const snapshot = await Products.get();
  const list = snapshot.docs.map((doc) => ({
    id_producto: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await Products.add(data);
  res.send({ Result: "Product added Successfully" });
});

app.post("/update", async (req, res) => {
  try {
    const id_producto = req.body.id_producto;
    console.log(req.body.id_producto);
    delete req.body.id_producto;
    const data = req.body;
    await Products.doc(id_producto).update(data);
    res.send({ Result: "Product updated Successfully" });
  }
  catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  const id_producto = req.body.id_producto;
  console.log(req.body.id_producto);
  delete req.body.id_producto;
  const data = {
    estado: 0,
  };
  await Products.doc(id_producto).update(data);
  res.send({ Result: "Product deleted Successfully" });
});

app.post("/active", async (req, res) => {
  const id_producto = req.body.id_producto;
  console.log(req.body.id_producto);
  delete req.body.id_producto;
  const data = {
    estado: 1,
  };
  await Products.doc(id_producto).update(data);
  res.send({ Result: "Product actived Successfully" });
});


app.listen(4000, () => console.log("Server is running at port 4000"));