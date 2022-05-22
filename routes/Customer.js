const express = require("express");
const router = express.Router();
const { Customer, Provider } = require("../config/config_test");

// Get all clients 🚩
router.get("/", async (req, res) => {
  try {
    const data = await Customer.get();
    const list = data.docs.map((doc) => ({
      doc_id: doc.id,
      ...doc.data(),
    }));
    res.send(list);
  } catch (error) {}
});

// Get by CI
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

// Add client
router.post("/", async (req, res) => {
  const data = req.body;
  await Customer.add(data);
  res.send({ message: "Cliente agregado" });
});

// Update client
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
