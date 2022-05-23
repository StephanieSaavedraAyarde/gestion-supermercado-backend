const express = require("express");
const router = express.Router();
const { Auth } = require("../config/config_test");

//LogIn
router.post("/login", async (req, res) => {
  const data = req.body;
  let final = "Default";
  console.log(data);

  Auth.signInWithEmailAndPassword(data.email, data.pass)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        console.log("Wrong password.");
      } else {
        console.log(errorMessage);
      }
      if (error) {
        res.status(400);
        final = error;
      } else {
        res.status(200);
        final = "Todo va bien";
      }
    })
    .then(function (error) {
      if (!error) {
        res.status(200);
        final = "Todo va bien";
      }
    });

    res.send(final)
});

//VerificarToken
router.post("/token", async (req, res) => {});

module.exports = router;
