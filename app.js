const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongourl } = require("./secret.js");

const port = 5000;

// connect mongodb:
mongoose.connect(mongourl);

//true case - established
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

//flase case - not established
mongoose.connection.on("error", (err) => {
  console.log("error connected to mongo", err);
});

app.listen(port, () => {
  console.log(`Authy app listen at http://localhost:${port}`);
});

// auth
// Bakt7C4XL7PLdykK

