const mysql = require('mysql2');
const message = require('../config/message.js');
const utility = require('../helpers/utility.js');
const pool = require('../config/connection_pool.js');
const db = require('../config/db.js');
const url = require('url');


//**********************  I  N  S  E  R  T  **********************/

exports.insertSingle = async (req, param) => {
    let sql = 'INSERT INTO customer_master_details SET ?';
    await pool.query("master_db", sql, [param]).catch(console.log);
}



//**********************   S  E  L  E  C  T  **********************/

exports.getUserData = async ()=> {
    let sql = 'SELECT * FROM trial_table';
    let details = await pool.query("master_db", sql);
    console.log(details);
    return details;
    // console.log(details);
}

exports.getIdMobileEmailPassUsingEmail= async (email)=>{
    let sql='SELECT customer_id,customer_mobile, customer_email, customer_password FROM customer_master_details WHERE customer_email=?';
    let result = await pool.query("master_db",sql,[email]).catch(console.log);
    if(!utility.checkEmpty(result))
    {
        result=result[0];
    }
    return result;
}; 