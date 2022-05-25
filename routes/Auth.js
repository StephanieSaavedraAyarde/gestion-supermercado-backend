const express = require("express");
const router = express.Router();
const { Auth } = require("../config/config_test");

//LogIn
router.post("/login", async (req, res) => {
  const data = req.body;
  let final = "Default";
  console.log(data);

  Auth.signInWithEmailAndPassword(data.email, data.pass)
    .then((user) => {
      final = user;
      res.send(final);
    })
    .catch((error) => {
      final = error;
      res.send(final);
    });
});

//VerificarToken
router.post("/token", async (req, res) => {});

module.exports = router;
