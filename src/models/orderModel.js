const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require("moment")


const orderSchema= new mongoose.Schema({
       
        bookId: {
          type:ObjectId,
          ref:'bookModel',
          required:true
        },
        
        Price: {
          type:Number,
          required:true, 
        },
        Items: {
          type:Number,
          required:true, 
        },
        
        status: {
          type:String,
          default: 'pending', 
          enum:["pending", "completed", "cancled"]
        },
        purchaseDate: {
          type:Date, 
          default:moment().format('YYYY-MM-DDThh:mm:ss.ms')
        }, 
       
      },{timestamps:true})

      module.exports = mongoose.model('orderModel', orderSchema)
