const express = require("express");
const cors = require("cors");
const Provedores = require("./config_provider");

const app = express();

app.use(express.json());
app.use(cors());

//PROVIDER

app.get("/provider", async (req, res) => {
  const snapshot = await Provedores.get();
  const list = snapshot.docs.map((doc) => ({
    id_proveedor: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

app.post("/provider", async (req, res) => {
  const data = req.body;

  await Provedores.add(data);
  const datai = req.body.id_proveedor;
  res.send({ data });
  console.log(datai);
});

app.put("/provider", async (req, res) => {
  try {
    const id_proveedor = req.body.id_proveedor;
    console.log(req.body.id_proveedor);
    delete req.body.id_proveedor;
    const data = req.body;
    await Provedores.doc(id_proveedor).update(data);
    res.send({ Result: "Provider updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/provider", async (req, res) => {
  const id_proveedor = req.body.id_proveedor;
  console.log(req.body.id_proveedor);
  delete req.body.id_proveedor;
  const data = {
    state: 0,
  };
  await Provedores.doc(id_proveedor).update(data);
  res.send({ Result: "Provider deleted Successfully" });
});

app.listen(4001, () => console.log("Provider Server is running at port 4001 ✅"));
