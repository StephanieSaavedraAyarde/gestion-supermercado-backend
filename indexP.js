const express = require("express");
const cors = require("cors");
//const Products = require("./config");
const Provedores = require("./Provedores");

const app = express();

app.use(express.json());
app.use(cors());


//provedores
app.get("/provedores", async (req, res) => {
  const snapshot = await Provedores.get();
  const list = snapshot.docs.map((doc) => ({
    // IdProvider: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

app.listen(4001, () => console.log("Server is running at port 4000"));
