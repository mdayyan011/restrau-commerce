const express=require("express");
const utility= require('../helpers/utility');
const message=require('../config/message');
const dbquery= require('../helpers/query');
const bcrypt = require('bcrypt'); 
const methods= require('../helpers/methods');
const customer_controller = require('./CustomerController');

exports.admin_login = [async(req,res)=>{
    try {  
        let input = req.body.inputData;
        let customer_email = input.customer_email;
        let details = await dbquery.getIdMobileEmailPassUsingEmail(customer_email);
        let customer_role = details.customer_role;
        let response={};
        if(customer_role !=1)
        {
        response['status']="error";
        response['mssg']="only admin can login here";
        return res.send(response);
        }  
        let passto = await customer_controller.customer_login(req,res);
    } catch (e) {
        console.log(e);
    }
} ]

exports.addProduct=[async(req,res)=>{
    try{        
        let admin_id = req.headers.user_id;  
        let customer_id=req.locals.customer_id;
        let details = await dbquery.get_all_using_id(customer_id);
        let customer_role = details.customer_role;
        let response={};
        if(customer_role !=1)
        {
        response['status']="error";
        response['mssg']="only admin can add products, if you are an admin then please login first";
        return res.send(response);
        }
        let input = req.body.inputData;
        let product_image = input.product_image;
        let product_price = input.product_price;
        let product_price_currency = input.product_price_currency;
        let product_discount = input.product_discount;
        let product_name = input.product_name;
        let product_category = input.product_category;
        let product_description = input.product_description;
        let param={};
         param['product_image']=product_image;
         param['product_price']=product_price;
         param['product_price_currency']=product_price_currency;
         param['product_discount']=product_discount;
         param['product_category']=product_category;
         param['product_name']=product_name;
         param['product_description']=product_description;
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

exports.removeProduct = [async(req,res)=>{
    try {
        let admin_id = req.headers.user_id;  
        let customer_id=req.locals.customer_id;
        let details = await dbquery.get_all_using_id(customer_id);
        let customer_role = details.customer_role;
        let response={};
        if(customer_role !=1)
        {
        response['status']="error";
        response['mssg']="only admin can add products, if you are an admin then please login first";
        return res.send(response);
        }
        let input = req.body.inputData;
        let product_id = input.product_id;
        let check_if_product_exist = await dbquery.check_if_product_exist(product_id);
        if(utility.checkEmpty(check_if_product_exist))
        {
            response['status']="error";
        response['mssg']="No product of given product id";
        return res.send(response);
        }
        dbquery.remove_product(product_id);
        response['status']="success";
        response['mssg']="product deleted successfully";
        return res.send(response);

    } catch (e) {
        console.log(e);
    }
}]