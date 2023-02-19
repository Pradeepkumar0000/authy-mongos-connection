const express = require("express");
const addressRouter = express.Router();
const mongoose = require("mongoose");
const address = mongoose.model("Address");
const user = mongoose.model("User");
const checkLogin = require("../middlewears/checkLogin.js");

addressRouter.post("/address", checkLogin, (req, res) => {
  const { houseName, city, postalCode } = req.body;
  // all is required
  if (!houseName || !city || !postalCode) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  // store it:
  const newAddress = new address({
    houseName,
    city,
    postalCode,
    usersAddress: req.user._id
  });
  newAddress.save().then((result) => {
    res.status(200).json({ address: result });
  });
});

addressRouter.get("/address", checkLogin, (req, res) => {
  let user = req.user;
  address.find({ usersAddress: user._id })
  .then((address) => {
    let arr = [];
    for (let t of address) {
      let { _id, houseName, city, postalCode } = t;
      let obj = {
        _id,
        houseName,
        city,
        postalCode,
        user: {
          _id: user,
          name: user.name,
          email: user.email,
        }
      }
      console.log(user)
      arr.push(obj);
    }

    res.status(200).json({ address: arr });
  });
});

addressRouter.get("/display",(req, res)=>{
  address.find()
  .then(addr =>{
    let arr = []
    for (let t of addr) {
      let { _id, houseName, city, postalCode, usersAddress} = t
      user.findById(usersAddress)
      .then(
        (sevedUser)=>{
        // console.log("saved", sevedUser)
        let obj = {_id, houseName, city, postalCode,
          user: {
            _id: sevedUser._id,
            name: sevedUser.name,
            email: sevedUser.email
          }
        }
        arr.push(obj)
      })
    }
    console.log(arr)
    res.status(200).json({address:addr})

  })
})

// to fetch all address - no login required ,
//

module.exports = addressRouter;
