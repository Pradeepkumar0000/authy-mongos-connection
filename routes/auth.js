const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

userRouter.post("/signup/", (req, res) => {
  // console.log(req.body)
  const { name, email, password } = req.body;
  // checkif name, email, password is not empty
  if (!name || !email || !password) {
    console.log("I reached to error 1");
    return res.send({ error: "please add all the fields" });
  }
  // name shold be >= 3 characters
  if (name.length < 3) {
    console.log("I reached to error 2");
    return res.send({ error: "name shold be atleast 3 characters" });
  }
  // password shold be >= 8 characters
  if (password.length < 8) {
    console.log("I reached to error 3");
    return res.send({ error: "password shold be atleast 8 characters" });
  }
  // check if email is valid
  if (!email.includes("@")) {
    return res.send({ error: "please a valid email" });
  }
  //   check if email already exists
  User.findOne({ email: email })

    .then((savedUser) => {
      console.log(savedUser);
      if (savedUser != null) {
        return res.send({ error: "user already exists" });
      } else if (savedUser == null) {
        //hashing password
        bcrypt
          .hash(password, 12)
          .then((hashedpassword) => {
            const storeUser = new User({
              name: name,
              email: email,
              password: hashedpassword,
            });
            storeUser
              .save()
              .then((user) => {
                console.log("user saved successfully", user);
                res.send({ message: "user saved successfully" });
              })

              .catch((err) => {
                console.log("while saving user to databse");
                console.log(err);
              }); // while saving user to databse
          })

          .catch((err) => {
            console.log("While hashing password");
            console.log(err);
          });
      }
    })

    .catch((err) => {
      console.log("while searching email in databse");
      console.log(err);
    }); //false => request was not able to complete for same reason, while searching email in databse
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  // check if, email, password is not empty
  if (!email || !password) {
    console.log("I reached to error 1");
    return res.send({ error: "please add all the fields" });
  }
  // check if email is valid
  if (!email.includes("@")) {
    return res.send({ error: "please a valid email" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      console.log(savedUser);
      if (savedUser == null) {
        return res.send({ error: "Email or password incorrect" });
      }
      let hashedpassword = savedUser.password;
      bcrypt
        .compare(password, hashedpassword)
        .then((passwordMatched) => {
          if (passwordMatched == false) {
            return res.send({ error: "email or password is incorrect" });
          }
          // generate token
          const token = jwt.sign({_id:savedUser._id}, "pksklu")
res.send({message:"user logged in successfully",token:token})

          return res.send({ message: "user login in successfull" });
        })
        .catch((err) => {
          console.log("while comparing password");
          console.log(err);
        });
    })

    .catch((err) => {
      console.log("While searching email in databse");
      console.log(err);
    });
});

module.exports = userRouter;
