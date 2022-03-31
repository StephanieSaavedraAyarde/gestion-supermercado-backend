const express = require("express");
const cors = require("cors");
//const Provedores = require("./config");
const Provedores = require("./Provedores");

const app = express();

app.use(express.json());
app.use(cors());

//  Datosque debe tener proveddores




//provedores
app.get("/provedores", async (req, res) => {
  const snapshot = await Provedores.get();
  const list = snapshot.docs.map((doc) => ({
    id_proveedor: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});


app.post("/createpro", async (req, res) => {
  const data = req.body;
  
  await Provedores.add(data);
 const datai=req.body.id_proveedor
  res.send({ data });
  console.log(datai)
});


app.post("/updatep", async (req, res) => {
  try {
    const id_proveedor = req.body.id_proveedor;
    console.log(req.body.id_proveedor);
    delete req.body.id_proveedor;
    const data = req.body;
    await Provedores.doc(id_proveedor).update(data);
    res.send({ Result: "Update proveedor" });
  }
  catch (error) {
    console.log(error);
  }
});


app.post("/deletep", async (req, res) => {
  const id_proveedor = req.body.id_proveedor;
  console.log(req.body.id_proveedor);
  delete req.body.id_proveedor;
  const data = {
    estate: 0,
  };
  await Provedores.doc(id_proveedor).update(data);
  res.send({ Result: "Product deleted Successfully" });
});

app.listen(4001, () => console.log("Server is running at port 4000"));
