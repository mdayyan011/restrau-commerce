const express= require("express");
const Route = express.Router();
const url=require("url");
const utility = require('../helpers/utility');
Route.use(async (req,res,next)=>{
    
    // if (utility_obj.checkEmpty(constants.dbconn)) {
    //     constants.dbconn = await dbcon.connection().catch(e => {
    //       console.log(e);
    //     })
    //   } 
    
      const user_id = req.headers.user_id;
      const url_link = url.parse(req.url, true);
      const path = url_link.pathname;
      let response={};
      console.log("path ++++++++", path);
      if (utility.checkEmpty(user_id)) {
        if (path === "/register/customer" || path === "/login") {
          console.log("Passed in path");
          next();
        } else {
          response['status']='error';
          
          res.send(response);
          return;
        }
      }
    next();
})
module.exports=Route;