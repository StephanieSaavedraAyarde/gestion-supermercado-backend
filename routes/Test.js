const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello World");
});

router.get("/1", async (req, res) => {
  res.send("Test1");
});

module.exports = router;
