const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
      title:{
            type:String,
            required:true,
            enum:["Mr", "Mrs", "Miss"]
      },
      name:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique:true
      },
      phone:{
            type:String,
            require:true,
            unique:true
      },
      password:{
            type:String,
            required:true
      }

},{timestamps:true})

module.exports = mongoose.model("customerModel", customerSchema)
