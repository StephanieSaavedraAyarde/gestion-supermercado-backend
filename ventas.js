const express = require("express");
const cors = require("cors");
const Ventas = require("./config_ventas");
const Products = require("./config_ventas");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/ventas", async (req, res) => {
  const snapshot = await Ventas.get();
  const list = snapshot.docs.map((doc) => ({
    id_venta: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

app.post("/ventas/create", async (req, res) => {
  const id = [];
  id = req.body.productos.id;
  const cantidad = [];
  cantidad = req.body.productos.cantidad;
  const data = req.body;
  const cupon = req.body.idCupon;
  const total = req.body.total;

  try {
    const productos = await Products.where('id', '==', id).get();
    productos.forEach((prod) => {
      prod.stock = prod.stock - prod.cantidad;
     });
  
    if(!productos.exists){
      res.status(400).send({ Result: "Producto no encontrado" });
    }else{
      await Ventas.add(data);
      res.send({ Result: "Added Successfully" });
    }
  } catch (error) {} 
});

app.post("/ventas/update", async (req, res) => {
  try {
    const id_venta = req.body.id_venta;
    console.log(req.body.id_venta);
    delete req.body.id_venta;
    const data = req.body;
    await Ventas.doc(id_venta).update(data);
    res.send({ Result: "Updated Successfully" });
  }
  catch (error) {
    console.log(error);
  }
});

app.post("/ventas/delete", async (req, res) => {
  const id_venta = req.body.id_venta;
  console.log(req.body.id_venta);
  delete req.body.id_venta;
  const data = {
    estado: 0,
  };
  await Ventas.doc(id_venta).update(data);
  res.send({ Result: "Deleted Successfully" });
});

app.listen(4004, () => console.log("Server is running at port 4004"));