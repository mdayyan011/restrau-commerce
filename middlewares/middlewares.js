const express= require("express");
const Route = express.Router();
const url=require("url");
const utility = require('../helpers/utility');
const dbcon =require('../config/connection_pool.js');
const constants = require('../config/constant.js');


Route.use(async (req,res,next)=>{
    
    if (utility.checkEmpty(constants.dbconn)) {
        constants.dbconn = await dbcon.connection().catch(e => {
          console.log(e);
        })
      } 
    
      const user_id = req.headers.user_id;
      const url_link = url.parse(req.url, true);
      const path = url_link.pathname;
      let response={};
      console.log("path ++++++++", path); 
      if (utility.checkEmpty(user_id)) {
        if (path === "/register/customer" || path === "/login/customer") {
          next();
        } else {
          response['status']='error';
          response['mssg']='Please Login First'
          return res.send(response);         
        }
      }
      else
      {
         next();//error yaha h ayyan
      }
})
module.exports=Route;