const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const User = mongoose.model("User")


const addressSchema = new mongoose.Schema(
    {
         houseName: {
            type: String,
            required: true
         },

         city: {
            type: String,
            required: true
         },
         postalCode:{
            type: String,
            required: true
         },
         usersAddress: {
             type: ObjectId,
             ref: User

         }
    }

)

mongoose.model( "Address", addressSchema)