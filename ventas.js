const express = require("express");
const cors = require("cors");
const Ventas = require("./config_ventas");
const Productos = require("./config_productos");
const Cupones = require("./config_cupones");

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

app.post("/create", async (req, res) => {
  const id = [];
  id = req.body.productos.id;
  const cantidad = [];
  cantidad = req.body.productos.cantidad;
  const data = req.body;
  const cupon = req.body.idCupon;
  const total = req.body.total;

  try {
    if(cupon != null){
      const cupones = await Cupones.where('id', '==', cupon).get();
      cupones.forEach((cupon) => {
        cupon.estado = 0;
        total = total - cupones.descuento;
        res.status(200).send( cupon.cupones());
       });
    
      if(!cupones.exists){
        res.status(400).send({ Result: "Cupon no encontrado" });
      }
    }

    const productos = await Productos.where('id', '==', id).get();
    productos.forEach((prod) => {
      prod.stock = prod.stock - cantidad;
      res.status(200).send( prod.productos());
     });
  
    if(!productos.exists){
      res.status(400).send({ Result: "Producto no encontrado" });
    }else{
      await Ventas.add(data);
      res.send({ Result: "Added Successfully" });
    }
  } catch (error) {} 
});

app.post("/update", async (req, res) => {
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

app.post("/delete", async (req, res) => {
  const id_venta = req.body.id_venta;
  console.log(req.body.id_venta);
  delete req.body.id_venta;
  const data = {
    estado: 0,
  };
  await Ventas.doc(id_venta).update(data);
  res.send({ Result: "Deleted Successfully" });
});

app.listen(4000, () => console.log("Server is running at port 4000"));