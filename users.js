const express = require("express");
const cors = require("cors");
const User = require("./config_user.js");

const app = express();

app.use(express.json());
app.use(cors());

//USER
app.get("/", async (req, res) => {
  res.send("User Server is running at port 4080 ✅");
});

app.get("/user", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({
    id_user: doc.id,
    ...doc.data(),
  }));
  res.send(list);
});

app.post("/user", async (req, res) => {
  const data = req.body;
  await User.add(data);
  //   const user_id = req.body.id_user;
  res.send({ data });
});

app.post("/edituser", async (req, res) => {
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

app.delete("/user", async (req, res) => {
  const user_id = req.body.user_id;
  console.log(req.body.user_id);
  delete req.body.user_id;
  const data = {
    state: 0,
  };
  await User.doc(user_id).update(data);
  res.send({ Result: "User deleted Successfully" });
});

app.listen(4080, () => console.log("User Server is running at port 4080 ✅"));
