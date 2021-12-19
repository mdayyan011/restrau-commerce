const mysql = require('mysql2');
const message = require('../config/message.js');
const utility = require('../helpers/utility.js');
const pool = require('../config/connection_pool.js');
const db = require('../config/db.js');
const url = require('url');


//**********************  I  N  S  E  R  T  **********************/

exports.insertSingle = async (db,param) => {
    let sql = 'INSERT INTO ?? SET ?';
    await pool.query("master_db", sql, [db,param]).catch(console.log);
}



//**********************   S  E  L  E  C  T  **********************/

exports.getUserData = async ()=> {
    let sql = 'SELECT * FROM trial_table';
    let details = await pool.query("master_db", sql);
    console.log(details);
    return details;
    // console.log(details);
}

exports.getIdMobileEmailPassUsingEmail = async (email)=>{
    let sql='SELECT customer_id,customer_mobile, customer_email,customer_first_name,customer_profile_pic, customer_password FROM customer_master_details WHERE customer_email=?';
    let result = await pool.query("master_db",sql,[email]).catch(console.log);
    if(!utility.checkEmpty(result))
    {
        result=result[0];
    }
    return result;
}; 

exports.get_all_using_mobile = async (mobile)=>{
    let sql='SELECT * FROM customer_master_details WHERE customer_mobile=?'; 
    let result = await pool.query("master_db",sql,[mobile]);
    if(!utility.checkEmpty(result))
    {
        result=result[0];
    }
    return result;
}

 
exports.get_all_using_id = async (id)=>{
    let sql='SELECT * FROM customer_master_details WHERE customer_id=?'; 
    let result = await pool.query("master_db",sql,[id]);
    if(!utility.checkEmpty(result))
    {
        result=result[0];
    }
    return result;
}

exports.present_product_average_rating = async (product_id)=>{
    let sql = 'SELECT product_average_rating FROM product_details WHERE product_id= ?';
    let result = await pool.query("master_db",sql,[product_id]);
    if(!utility.checkEmpty(result))
    {
        result=result[0];
    }
    return result;
}

//**********************   U P D A T E  **********************/

exports.update_product_rating = async (rating,product_id)=>{
    let sql = 'UPDATE product_details SET product_average_rating= ? WHERE product_id= ?';
    let result = await pool.query("master_db",sql,[rating,product_id]);
    if(!utility.checkEmpty(result))
    {
        result=result[0];
    }
    return result;
}