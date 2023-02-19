const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
      title:{
            type:String,
            required:true,
            enum:["Mr", "Mrs", "Miss"]
      },
      sellerName:{
            type:String,
            required:true
      },
      tollFreeNumber:{
            type:String,
            required:true,
            unique:true
      },
     
      address:{
            street:String,
            city:String,
            pincode:String,
           

      },
      

},{timestamps:true})

module.exports = mongoose.model("sellerModel", sellerSchema)
