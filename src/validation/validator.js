const validName = (name) => /^[a-zA-Z ]{3,20}$/.test(name);
const validMail = (mail) => /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail);
const validNumber = (number) => (/^[6-9]{1}?[0-9]{9}$/).test(number);
const validPin = (pin) => (/^[1-9]{1}?[0-9]{5}$/).test(pin);
const validStreet = (street) => /^[a-zA-Z0-9._ ]{3,20}$/.test(street);
const validCity = (city) => /^[a-zA-Z ]{3,20}$/.test(city);
const isValidPrice = function (value) {
    return (/^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/).test(value)
}
const isValidMobileNo = function (phone) {
    const regexMob = /^[6-9]\d{9}$/
    return regexMob.test(phone);
  };
  
  const isValidPassword = (password) => {
    const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    return regPass.test(password)
  }
  const isValidISBN = function (ISBN) {
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
    return isbnRegex.test(ISBN);
  };

  const isValidString = function (value) {
    if (typeof value ==="undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === "number" && value.trim().length === 0) return false  
    if (typeof value === "object") return false
    const regexTitle = /^[a-zA-Z ]+([0-9]+)?[!@#$%^&*_+=]?/;
    return regexTitle.test(value);
  };

module.exports={ validName, validMail, validNumber, validPin, validStreet, validCity,isValidPrice,isValidMobileNo,isValidPassword,isValidISBN,isValidString}