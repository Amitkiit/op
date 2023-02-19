const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const {sellerCreate} = require("../controller/sellerController.js")
const{createCustomer,loginCustomer} =require("../controller/customerController")
const{bookCreate,filterBook} = require("../controller/bookController")
const{createOrder,filterOrder} = require("../controller/orderController")
const {authentication,authorization} = require("../middleware/auth")
//const {createBooks, getBook, updateBook, deleteBook,getBookById} = require("../controllers/bookController")


//==================Seller Detaisl=================================//
router.post("/sellerDetails",sellerCreate)

//==============Customer Details====================================//
router.post("/customerDetails",createCustomer)
router.post("/loginCustomer",loginCustomer)

//=============Book Details ============================//

router.post("/bookDetails",bookCreate)
router.get("/findBook",filterBook)

//===================Order Details===================================//
router.post("/orderCreate/:userId",authentication,authorization,createOrder)
router.get("/findOrder",authentication,authorization,filterOrder)












module.exports= router