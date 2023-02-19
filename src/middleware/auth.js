const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel");
let authentication = async function (req, res, next) {
    let token = req.headers['x-api-key']
        if (token) {
            let decodedToken = jwt.verify(token, "this is my first project")
            req.Id = decodedToken.userId //for authorization purpose
            next()
        }
        else {
            res.status(400).send({ msg: "x-api-key is require in header" })
        }
}

//========================Authorization========================================//
const authorization = async function (req, res, next) {
    let x = req.params.userId
        let Id = req.Id
        let db = await customerModel.findOne({_id:x})
        //console.log(db)
        if (!db) return res.status(404).send({ msg: "data not found" })
        let y = db.authorId.toString()
        //console.log(y)
        if (Id == y) {
            next()
        }
        else {
            res.status(403).send({ msg: "unauthorized user" })
        }
}
module.exports = {authentication,authorization}