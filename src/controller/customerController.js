const customerModel = require("../models/customerModel");
const jwt = require("jsonwebtoken");
//const bcrypt = require('bcrypt');

const {
  validName,
  isValidMobileNo,
  validMail,
  isValidPassword,
} = require("../validation/validator");
const { exists } = require("../models/customerModel");

const createCustomer = async function (req, res) {
  try {
    const data = req.body;
    let { title, name, email, phone, password } = data;
    if (!title) return res.status(400).send({ message: "title is require" });
    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Can only use Mr, Mrs and Miss" });
    }
    if (!name) return res.status(400).send({ message: "name is require" });
    if (!validName(name))
      return res.status(400).send({ message: "pls provide valid name" });
    if (!email) return res.status(400).send({ message: "email is require" });
    if (!validMail(email))
      return res.status(400).send({ message: "pls provide valid email" });
    let uniqueEmail = await customerModel.findOne({ email: email });
    if (uniqueEmail)
      return res.status(400).send({ message: "email is already exist" });
    if (!phone)
      return res.status(400).send({ message: "pls provide phone number" });
    if (!isValidMobileNo(phone))
      return res
        .status(400)
        .send({ message: "pls provide valid phone number" });
    let uniqueMobileNo = await customerModel.findOne({ phone: phone });
    if (uniqueMobileNo)
      return res
        .status(400)
        .send({ message: "phone Number is already exists" });

    if (!password)
      return res.status(400).send({ message: "password is require" });
    if (!isValidPassword(password))
      return res.status(400).send({ message: "pls provide valid password" });


    let customerCreate = await customerModel.create(data);
    res.status(201).send({
      status: true,
      message: "customer Create successfully",
      data: customerCreate,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const loginCustomer = async function (req, res) {
  try {
    let data = req.body;
    const { email, password } = data;
    let verifyUser = await customerModel.findOne({
      email: email,
      password: password,
    });
  if (!verifyUser)
      return res
        .status(400)
        .send({ status: false, message: "customer details not found" });
    let payload = { userId: verifyUser._id, iat: Date.now() };

    let token = jwt.sign(payload, "this is my first project");
    let decodedToken = jwt.verify(token, "this is my first project");
    let UserID = decodedToken.userId;
    let IAT = decodedToken.iat;
    let ExpiresIn = decodedToken.exp;

    res.setHeader("x-api-key", token);
    res.status(200).send({
      status: true,
      message: "login successful",
      data: token,
      UserID,
      IAT,
      ExpiresIn,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { createCustomer, loginCustomer };
