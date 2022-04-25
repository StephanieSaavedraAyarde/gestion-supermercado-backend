const express = require("express");
const cors = require("cors");
const Ventas = require("./config_ventas");
const Products = require("./config_ventas");

const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get("/ventas", async (req, res) => {
  const snapshot = await Ventas.get();
  const list = snapshot.docs.map((doc) => ({
    id_venta: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

// app.post("/ventas", async (req, res) => {
//   // let id  = req.body.productos.id;
//   // let cantidad = [];
//   // cantidad = req.body.productos.cantidad;
//   let data = req.body;
//   // let cupon = req.body.idCupon;
//   let total = req.body.total;

//   try {
//     const productos = await Products.where('id', '==', id).get();
//     productos.forEach((prod) => {
//       prod.stock = prod.stock - prod.cantidad;
//      });
  
//     if(!productos.exists){
//       res.status(400).send({ Result: "Producto no encontrado" });
//     }else{
//       await Ventas.add(data);
//       res.send({ Result: "Added Successfully" });
//     }
//   } catch (error) {} 
// });

// Ventas sin actualizar stock
app.post("/venta", async (req, res) => {
  let data = req.body;
  await Ventas.add(data);
  res.send({ Result: "venta Registrada" });
});

app.put("/ventas", async (req, res) => {
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

app.delete("/ventas", async (req, res) => {
  let id_venta = req.body.id_venta;
  console.log(req.body.id_venta);
  delete req.body.id_venta;
  let data = {
    estado: 0,
  };
  await Ventas.doc(id_venta).update(data);
  res.send({ Result: "Deleted Successfully" });
});

app.listen(4004, () => console.log("Server is running at port 4004"));