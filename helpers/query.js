const mysql = require('mysql2');
const message_obj = require('../config/message.js'); 
const utility_obj = require('../helpers/utility.js');
const pool = require('../config/connection_pool.js');
const db = require('../config/db.js');
const url = require('url');
 

exports.getUserData = async function() {
    let sql = 'SELECT * FROM trial_table';
    var details=await pool.query("master_db",sql); 
    console.log(details);
    return details;
    // console.log(details);
   }
  