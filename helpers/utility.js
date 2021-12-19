//true will only be returned if the check is not correct for us for example checkempty will be true when the value is empty and checkmobileformat will be true if the mobile format is not correct
const constants=require('../config/constant');
const bcrypt= require('bcrypt');

exports.checkEmpty = function (data) {
  if (typeof data == "object") {
    for (key in data) {
      if (Object.hasOwnProperty.bind(data)(key)) {
        return false;
      }
    }
    return true;
  }
  if (
    data == " " ||
    data == undefined ||
    data.length === 0 ||
    data == null ||
    !data
  )
    return true;
  else return false;
};

exports.checkMobileFormat = function (mobile) {
  if (mobile.length != 10) 
  return true;
  else return false;
};

exports.checkEmailFormat = function (email) {
  const email_reg_exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email_reg_exp.test(email)) 
  return true;
  else return false;
};
 

exports.encryptData = (data)=>{
  const namak = bcrypt.genSaltSync(constants.namak); 
  const uljha = bcrypt.hashSync(data, namak);
  return uljha;
}