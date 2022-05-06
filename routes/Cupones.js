const express = require("express");
const router = express.Router();
const {Cupon} = require("../config/config_test");


router.get("/", async (req, res) => {
  const snapshot = await Cupon.get();
  const list = snapshot.docs.map((doc) => ({
    id_Cupon: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});
//Sirve para creae
router.post("/", async (req, res) => {
    try{
        const data = req.body;
        await Cupon.add(data);
        res.send({ data });
    }catch(e){
        console.log(e)
    }
 
});
//Busqueda de cupon por nomnbre
router.get("/uniqueC", async (req, res) => {
    try {
      const cupones = req.query.cu;
     
      console.log(cupones);
  
      const data = await Customer.where("cupones", "==", cupones).get();
      const list = data.docs.map((doc) => ({
        doc_ic: doc.id,
        ...doc.data(),
      }));
  
      res.send(list);
    } catch (error) {
      res.status(404).send({ error: "Error en el Try", user: null });
    }
  });

router.delete("/", async (req, res) => {
  const Cupon_id = req.body.id_Cupon;
  console.log(req.body);
  delete req.body.id_Cupon;
  const data = {
    estado: 1,
  };
  await Cupon.doc(Cupon_id).update(data);
  res.send({ Result: "Cupon used Successfully" });
});




module.exports = router;
