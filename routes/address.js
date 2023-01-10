const express = require('express');
const addressRouter = express.Router();
const mongoose = require('mongoose');
const address = mongoose.model("Address");
const user = mongoose.model("User");
const checkLogin = require('../middlewears/checkLogin.js');


addressRouter.post("/address",checkLogin, (req, res) => {
    const { houseName, city, postalCode } = req.body;
    // all is required 
    if(!houseName || !city || !postalCode){
        return res.status(422).json({error: "Please add all the fields"})
    }
    // store it: 
    const newAddress = new address({
        houseName,
        city,
        postalCode,
        usersAddress: req.user
    })
    newAddress.save().then(result => {
        res.status(200).json({address: result})
    })
    
})

addressRouter.get("/address",checkLogin, (req, res) => {
    let user = req.user;
    address.find({usersAddress: user._id})
    .then(address => {
        let arr = []
        for(let t of address){
            let {_id, houseName, city, postalCode} = t
            let obj = {_id, houseName, city, postalCode, 
              user:{
                _id: user._id,
                name: user.name,
                email: user.email
              }
            }
            arr.push(obj)
        }


        res.status(200).json({address: arr})
    })

})

// to fetch all address - no login required , 
// 



module.exports = addressRouter;