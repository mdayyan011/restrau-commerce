const express= require("express");
const Route = express.Router();
const url=require("url");
const utility = require('../helpers/utility');
const dbcon =require('../config/connection_pool.js');
const constants = require('../config/constant.js');
const methods = require('../helpers/methods')

Route.use(async (req,res,next)=>{
    
    if (utility.checkEmpty(constants.dbconn)) {
        constants.dbconn = await dbcon.connection().catch(e => {
          console.log(e);
        })
      } 
    
      let user_id = req.headers.user_id;
      let url_link = url.parse(req.url, true);
      let path = url_link.pathname;
      let response={};
      req.locals = {};
      req.locals.customer_id={};
      console.log("req.locals ++++++++", req.locals); 
      if (utility.checkEmpty(user_id)) {
        if (path === "/register/customer" || path === "/login/customer" || path==="/admin/login" || path ==="/readProduct" || path==="/readFeedback") {
          next();
        } else {
          response['status']='error';
          response['mssg']='Please Login First'
          return res.send(response);         
        }
      }
      else
      { 
        let authenticate_token_status = await methods.authenticate_token_status(user_id);
        if(!authenticate_token_status)
        {
            response['status']="error";
            response['mssg']='Wrong User Id!!!';
            return res.send(response);
        }
        let user_id_arr = user_id.split(":::");
        let customer_id = user_id_arr[1]; 
        req.locals.customer_id = customer_id;
        console.log(req.locals.customer_id);
         next();
      }
})
module.exports=Route;