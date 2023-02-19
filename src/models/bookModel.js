const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
      bookName:{
            type:String,
            required:true,  
            unique:true,
            
      },
      excerpt:{
            type:String,
            required:true,
          
      },
     
      ISBN:{
            type:String,
            required:true,
            unique:true
      },
      category:{
            type:String,
            required:true
      },
     
      reviews:{
            type:Number,
            default:0
      },
    
      

},{timestamps:true})

module.exports = mongoose.model("bookModel", bookSchema)
