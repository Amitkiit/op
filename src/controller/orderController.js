const bookModel = require("../models/bookModel");
const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");
const { checkout } = require("../routes/route");
const { isValidObjectId } = require("mongoose");
const { isValidPrice } = require("../validation/validator");

const createOrder = async function (req, res) {
  try {
    let data = req.body;
    let userId = req.params.userId;
    let { bookId, Price, Items, status } = data;
    if (!bookId)
      return res
        .status(400)
        .send({ status: true, message: "user id is required" });
    if (!isValidObjectId(bookId))
      return res.status(400).send({ message: "book id is not valid" });

    if (!Price)
      return res
        .status(400)
        .send({ status: true, message: "Price is required" });
    if (!isValidPrice(price))
      return res
        .status(400)
        .send({ status: false, message: "price is not in vaid form" });
    if (!Items)
      return res
        .status(400)
        .send({ status: true, message: "Items is required" });
    if (!status)
      return res
        .status(400)
        .send({ status: true, message: "status is required" });
    if (!["pending", "completed", "cancled"].includes)
      return res
        .status(400)
        .send({ message: "only allow pending, completed, cancled" });
    let orderCreation = await orderModel.create(data);
    return res
      .status(201)
      .send({
        status: true,
        message: "Book create successfully",
        data: orderCreation,
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const filterOrder = async function (req, res) {
  try {
    let userId = req.params.userId;

    let checkUserId = await customerModel.findById({ _id: userId });
    if (!checkUserId)
      return res
        .status(400)
        .send({
          status: false,
          message: "user have no access because they are not his account",
        });
    let query = req.query;
    const { bookName, price, purchaseDate } = query;
    let obj = {};
    if (bookName) {
      let CheackBooKName = await bookModel.findOne({ bookName: bookName });
      if (!CheackBooKName)
        return res
          .status(400)
          .send({ status: false, message: "book not found" });
      obj["bookName"] = CheackBooKName.bookName;
    }

    if (price) {
      obj.price = price;
    }
    if (purchaseDate) {
      obj.purchaseDate = purchaseDate;
    }

    let checkOrder = await orderModel.findOne(obj);
    return res
      .status(200)
      .send({
        status: true,
        message: "order check successfully",
        data: checkOrder,
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { createOrder, filterOrder };
