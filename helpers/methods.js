const query = require('../helpers/query');
const utility= require('../helpers/utility');
const bcrypt = require('bcrypt');
const constants = require('../config/constant');



exports.authentication_status= async (customer_email,customer_password)=>
{
    let correct_data= await query.getIdMobileEmailPassUsingEmail(customer_email);
    let flag = true;
    if(utility.checkEmpty(correct_data))
    {
        flag = false;
        return flag;
    }

    let encrypted_customer_password = correct_data.customer_password;
    flag = bcrypt.compareSync(customer_password,encrypted_customer_password);
    return flag;
}

exports.user_id = async (email)=>{
    let data = await query.getIdMobileEmailPassUsingEmail(email);
    let customer_id=data.customer_id;
    let customer_mobile = data.customer_mobile;
    let customer_email= data.customer_email;  
    let encrypted_mobile = await utility.encryptData(customer_mobile);
    let encrypted_email = await utility.encryptData(customer_email);
    let usrid =  encrypted_mobile+":::"+customer_id+":::"+encrypted_email;
    return usrid;
} 