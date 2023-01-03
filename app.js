const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongourl } = require("./secret.js");
require("./models/user.js");
const userRouter = require("./routes/auth.js");

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
app.use(express.json());
app.use("/api/auth", userRouter);

app.listen(port, () => {
  console.log(`Authy app listen at http://localhost:${port}`);
});
