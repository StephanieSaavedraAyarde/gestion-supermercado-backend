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

//Update

router.put("/", async (req, res) => {
    try {
      const month_id = req.body.id_month;
      delete month_id ;
      const data = req.body;
      console.log(data);
      await Month.doc(month_id ).update(data);
      res.send({ Result: "Month  updated Successfully" });
    } catch (error) {
      console.log(error);
    }
  });


module.exports = router;