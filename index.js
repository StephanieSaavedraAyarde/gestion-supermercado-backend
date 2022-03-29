const express = require("express");
const cors = require("cors");
const Products = require("./config");
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
  res.send({ msg: "Agregado" });
});

app.post("/update", async (req, res) => {
  try {
    const id_producto = req.body.id_producto;
    console.log(req.body.id_producto);
    delete req.body.id_producto;
    const data = req.body;
    await Products.doc(id_producto).update(data);
    res.send({ msg: "Editado" });
  } catch (error) {
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
  res.send({ msg: "Borrado" });
});

app.post("/activep", async (req, res) => {
  const id_producto = req.body.id_producto;
  console.log(req.body.id_producto);
  delete req.body.id_producto;
  const data = {
    estado: 1,
  };
  await Products.doc(id_producto).update(data);
  res.send({ msg: "activado" });
});
app.listen(4000, () => console.log("Up & RUnning *4000"));
