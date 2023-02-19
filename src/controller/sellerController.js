const sellerModel = require("../models/sellerModel");
const {
  validName,
  isValidMobileNo,
  validStreet,
  validPin,
  validCity,
} = require("../validation/validator");

const sellerCreate = async function (req, res) {
  try {
    let data = req.body;
    const { title, sellerName, tollFreeNumber, address } = data;
    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "Title is require" });
    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Can only use Mr, Mrs and Miss" });
    }
    if (!sellerName)
      return res
        .status(400)
        .send({ status: false, message: "sellerName is require" });
    if (!validName(sellerName))
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid sellerName " });
    if (!tollFreeNumber)
      return res
        .status(400)
        .send({ status: false, message: "tollFreeNumber is require" });
    if (!isValidMobileNo(tollFreeNumber))
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid tollFreeNumber  " });
    let uniqueMobileNumber = await sellerModel.findOne({
      tollFreeNumber: tollFreeNumber,
    });
    if (uniqueMobileNumber)
      return res
        .status(400)
        .send({ status: false, message: "unique mobile number is require" });
    if (!address)
      return res
        .status(400)
        .send({ status: false, message: "address is require" });
    if (!validStreet(address.street))
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid street name  " });
    if (!validCity(address.city))
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid city name  " });
    if (!validPin(address.pincode))
      return res
        .status(400)
        .send({ status: false, message: "pls provide valid pincode name" });
    let createSeller = await sellerModel.create(data);
    return res
      .status(201)
      .send({
        status: true,
        message: "Seller details create successfully",
        data: createSeller,
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { sellerCreate };
