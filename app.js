const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongourl } = require("./secret.js");
require("./models/user.js");
require("./models/address.js");
const userRouter = require("./routes/auth.js");
const addressRouter = require("./routes/address.js");

const port = 5000;

// connect mongodb:
mongoose.connect(mongourl);

// true case - established
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

// false case - not established
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongo", err);
});

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api", addressRouter);

app.listen(port, () => {
  console.log(`Authy app listening at http://localhost:${port}`);
});
