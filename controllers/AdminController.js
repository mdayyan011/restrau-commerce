const express=require("express");
const utility= require('../helpers/utility');
const message=require('../config/message');
const dbquery= require('../helpers/query');
const bcrypt = require('bcrypt'); 
const methods= require('../helpers/methods');



exports.add_product=[async(req,res)=>{
    try{        
        let admin_id = req.headers.user_id;
        let authenticate_token_status = await methods.authenticate_token_status(admin_id);
        let response={};
        if(!authenticate_token_status)
        {
            response['status']="error";
            response['mssg']='Wrong Token!!!';
            return res.send(response);
        }
        
        let input = req.body.inputData;
        let product_image = input.product_image;
        let product_price = input.product_price;
        let product_price_currency = input.product_price_currency;
        let product_discount = input.product_discount;
        let product_name = input.product_name;
        let product_description = input.product_description;
        let param={};
         param['product_image']=product_image;
         param['product_price']=product_price;
         param['product_price_currency']=product_price_currency;
         param['product_discount']=product_discount;
         param['product_name']=product_name;
         param['product_name']=product_name;
        dbquery.insertSingle("product_details",param);

        response['status']="success";
        response['mssg']="successfully inserted";
        return res.send(response);
        
    }
    catch(error)
    {
        console.log(error);
    }
}]
