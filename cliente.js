const express = require("express");
const cors = require("cors");
const Cliente = require("./config_cliente");


const app = express();

app.use(express.json());
app.use(cors());
// Tener lista de clientes
app.get("/clienteG", async (req, res) => {
  const snapshot = await Cliente.get();
  const list = snapshot.docs.map((doc) => ({
    id_cliente: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

// Agregar cliente
app.post("/clienteA", async (req, res) => {
  const data = req.body;
  await Cliente.add(data);
  res.send({ Result: "Cliente agregado" });
});

// tener cliente por ci AUN TRABAJANDO
app.get("/clienteCi", async (req, res) => {
    const cedulaI = req.body.cedulaI;

    const querySnapshot = await Cliente.where('cedulaI', '==', cedulaI).get();
    querySnapshot.forEach((doc) => {
      res.send( doc.data());
    });     
  });

//Editado
app.post("/clienteU", async (req, res) => {
  try {
    const id_cliente = req.body.id_cliente;
    console.log(req.body.id_cliente);
    delete req.body.id_cliente;
    const data = req.body;
    await Cliente.doc(id_cliente).update(data);
    res.send({ Result: "Cliente Updateado" });
  }
  catch (error) {
    console.log(error);
  }
});

app.listen(4002, () => console.log("Server is running at port 4003"));