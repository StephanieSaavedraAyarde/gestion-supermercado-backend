const express = require("express");
const router = express.Router();
const { Customer } = require("../config/config_test");

// Obtener cliente (Lista) 🚩
router.get("/", async (req, res) => {
  try {
    // TODOS LOS CLIENTES
    const data = await Customer.get();
    const list = data.docs.map((doc) => ({
      doc_id: doc.id,
      ...doc.data(),
    }));
    res.send(list);
  } catch (error) {}
});

// OBTENER POR CI
router.get("/unique", async (req, res) => {
  try {
    const user_CI = req.query.ci;
    console.log(typeof user_CI);
    console.log(user_CI);

    const data = await Customer.where("cedulaI", "==", parseInt(user_CI)).get();
    const list = data.docs.map((doc) => ({
      doc_ic: doc.id,
      ...doc.data(),
    }));

    res.send(list);
  } catch (error) {
    res.status(404).send({ error: "Error en el Try", user: null });
  }
});

// AGREGAR CLIENTE
router.post("/", async (req, res) => {
  const data = req.body;
  await Customer.add(data);
  res.send({ message: "Cliente agregado" });
});

// EDITAR CLIENTE
router.put("/", async (req, res) => {
  try {
    const id_cliente = req.body.id_cliente;
    console.log(req.body.id_cliente);
    delete req.body.id_cliente;
    const data = req.body;
    await Customer.doc(id_cliente).update(data);
    res.send({ message: "Cliente Editado" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
