const express = require("express");
const router = express.Router();
const { Auth } = require("../config/config_test");
const { admin } = require("../config/config_admin");
const jwt = require("jsonwebtoken");

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
router.post("/token", async (req, res) => {
  const data = req.body;
  console.log(data);

  let idToken = data.token;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      console.log("ID Token correctly decoded", decodedIdToken);
      admin
        .auth()
        .getUser(decodedIdToken.uid)
        .then((userRecord) => {
          return res.send({ code: 200, user: userRecord });
        })
        .catch((error) => {
          console.error("Error while getting Firebase User record:", error);
          return res.send({ code: 403, error: "Unauthorized" });
        });
    })
    .catch((error) => {
      console.error("Error while verifying Firebase ID token:", error);
      return res.send({ code: 403, error: "Unauthorized" });
    });
});

module.exports = router;
