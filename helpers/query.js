const customer_controller = require('../controllers/CustomerController');
const utility = require('./utility.js');
const message = require('../config/constant');
const pool = require('../config/connection_pool');

// ++++++++++++++****** I N S E R T ********++++++++++++++

exports.insert = async (req,param)=>{
    let sql = `INSERT INTO master_customer_db SET ?`;
    let content = await pool.query("master_db", sql, [param]);
    return content;
}
