const express = require("express");
const router = express.Router();
const {Month} = require("../config/config_test");

//Busqueda 
router.get("/", async (req, res) => {
  const snapshot = await Month.get();
  const list = snapshot.docs.map((doc) => ({
    id_month: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

//Agregar 
router.post("/", async (req, res) => {
  const data = req.body;
  await Month.add(data);
  res.send({ data });
});


module.exports = router;