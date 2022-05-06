const express = require("express");
const cors = require("cors");
const PORT = 4080;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const userRoute = require("./routes/User.js");
const customerRoute = require("./routes/Customer");
const testRoute = require("./routes/Test");
const productRoute = require("./routes/Product");
const providerRoute = require("./routes/Provider");
const saleRoute = require("./routes/Sale");

app.use("/user", userRoute);
app.use("/customer", customerRoute);
app.use("/test", testRoute);
app.use("/product", productRoute);
app.use("/provider", providerRoute);
app.use("/sale", saleRoute);

app.use(express.json());

app.listen(PORT, () => console.log("Server is running at port 4080 ✅"));
