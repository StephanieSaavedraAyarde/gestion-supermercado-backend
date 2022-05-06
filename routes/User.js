const express = require("express");
const router = express.Router();
const {User} = require("../config/config_test");

//Busqueda de usuario total
router.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({
    id_user: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

//Agregar usuario
router.post("/", async (req, res) => {
  const data = req.body;
  await User.add(data);
  res.send({ data });
});

//Update de usuario
router.put("/", async (req, res) => {
  try {
    const user_id = req.body.id_user;
    delete user_id;
    const data = req.body;
    console.log(data);
    await User.doc(user_id).update(data);
    res.send({ Result: "User updated Successfully" });
  } catch (error) {
    console.log(error);
  }
});

//Borrado de usuario
router.delete("/", async (req, res) => {
  const user_id = req.body.id_user;
  console.log(req.body);
  delete req.body.id_user;
  const data = {
    state: 0,
  };
  await User.doc(user_id).update(data);
  res.send({ Result: "User deleted Successfully" });
});

module.exports = router;
