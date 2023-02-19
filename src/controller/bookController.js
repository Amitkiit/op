const bookModel = require("../models/bookModel");
const {
  validName,
  isValidISBN,
  isValidString,
} = require("../validation/validator");

const bookCreate = async function (req, res) {
  try {
    let data = req.body;
    //console.log(data)
    const { bookName, excerpt, ISBN, category } = data;
    if (!bookName)
      return res
        .status(400)
        .send({ status: false, message: "bookName is required" });
    if (!isValidString(bookName))
      return res.status(400).send({ message: "pls provide valid book name" });
    let uniqueBookNeed = await bookModel.findOne({ bookName: bookName });
    if (uniqueBookNeed)
      return res.status(400).send({ message: "book name is already exist" });
    if (!excerpt)
      return res
        .status(400)
        .send({ status: false, message: "excerpt is required" });
    if (!validName(excerpt))
      return res.status(400).send({ message: "pls provide valid excerpt" });
    if (!ISBN)
      return res
        .status(400)
        .send({ status: false, message: "ISBN is required" });
    if (!isValidISBN(ISBN))
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid ISBN name" });
    let uniqueISBNNeed = await bookModel.findOne({ ISBN: ISBN });
    if (uniqueISBNNeed)
      return res.status(400).send({ message: "ISBN is already exist" });
    if (!category)
      return res
        .status(400)
        .send({ status: false, message: "bookName is category" });
    if (!validName(category))
      return res.status(400).send({ message: "pls provide valid category" });

    createBook = await bookModel.create(data);
    res.status(201).send({ status: true, data: createBook });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const filterBook = async function (req, res) {
  try {
    let data = req.query;
    const { bookName, ...rest } = data;
    let condition = {};
    if (bookName) {
      condition.bookName = { $regex: data.bookName, $options: "i" };
    }
    if (Object.keys(rest).length != 0)
      return res
        .status(400)
        .send({ status: false, message: "please remove unnecessary fields" });
    let getBook = await bookModel.find(condition);
    if (!getBook)
      return res
        .status(400)
        .send({ status: false, message: "book is not found" });
    res
      .status(200)
      .send({ status: true, message: "Book details find", data: getBook });
  } catch (error) {}
};

module.exports = { bookCreate, filterBook };
