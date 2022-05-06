const express = require("express");
const router = express.Router();
const { Provider } = require("../config/config_test");

//Lista de proveedores
router.get("/", async (req, res) => {
  const snapshot = await Provider.get();
  const list = snapshot.docs.map((doc) => ({
    id_proveedor: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});
//Post de proveedores

router.post("/", async (req, res) => {
  const data = req.body;
  await Provider.add(data);
  const datai = req.body.id_proveedor;
  res.send({ data });
  console.log(datai);
});
//Editado de proveedores
router.put("/", async (req, res) => {
  try {
    const id_proveedor = req.body.id_proveedor;
    console.log(req.body.id_proveedor);
    delete req.body.id_proveedor;
    const data = req.body;
    await Provider.doc(id_proveedor).update(data);
    res.send({ Result: "Provider was updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});
//Borrado de proveedor
router.delete("/", async (req, res) => {
  const id_proveedor = req.body.id_proveedor;
  console.log(req.body.id_proveedor);
  delete req.body.id_proveedor;
  const data = {
    state: 0,
  };
  await Provider.doc(id_proveedor).update(data);
  res.send({ Result: "Provider was deleted Successfully" });
});

module.exports = router;
