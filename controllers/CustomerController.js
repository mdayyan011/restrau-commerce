const express=require("express");
const utility= require('../helpers/utility');
const message=require('../config/message');
const dbquery= require('../helpers/query');
const bcrypt = require('bcrypt'); 
const methods= require('../helpers/methods');

exports.customer_register=[async(req,res)=>{
    try{
        let input= req.body.inputData;
        let first_name=input.first_name;
        let last_name=input.last_name;
        let customer_mobile= input.customer_mobile;
        let customer_email=input.customer_email;
        let customer_password=input.customer_password;
        let customer_address_locality= input.customer_address_locality;
        let customer_address_landmark=input.customer_address_landmark;
        let customer_address_district= input.customer_address_district;
        let customer_address_pincode= input.customer_address_pincode;
        let customer_address_state= input.customer_address_state;
        let customer_profile_pic = input.customer_profile_pic;
        

        let response={};
        if(utility.checkEmpty(first_name))
        {
            response["status"]="error";
            response["msg"]=message.empty_first_name;
            return res.send(response);
        }
        if(utility.checkEmpty(customer_mobile))
        {
            response["status"]="error";
            response["msg"]=message.empty_mobile;
            return res.send(response);
        }
        if(utility.checkMobileFormat(customer_mobile))
        {
            console.log(customer_mobile);
            response["status"]="error";
            response["msg"]=message.incorrect_mobile;
            return res.send(response);
        } 

        if(utility.checkEmpty(customer_email))
        {
            response["status"]="error";
            response["msg"]=message.empty_email;
            return res.send(response);
        }

        if(utility.checkEmailFormat(customer_email))
        {
            response["status"]="error";
            response["msg"]=message.incorrect_email;
            return res.send(response); 
        }

        if(utility.checkEmpty(customer_password))
        {
            response["status"]="error";
            response["msg"]=message.empty_password;
            return res.send(response);
        }
        
        //check for duplicacy of email and mobile
        let email_duplicacy_data = await dbquery.getIdMobileEmailPassUsingEmail(customer_email); 
        if(!utility.checkEmpty(email_duplicacy_data))
        {
            response["status"]="error";
            response["msg"]="a user is already registered with the same email";
            return res.send(response);
        }

        let mobile_duplicacy_data = await dbquery.get_all_using_mobile(customer_mobile);
        console.log(mobile_duplicacy_data);
        if(!utility.checkEmpty(mobile_duplicacy_data))
        {
            response["status"]="error";
            response["msg"]="a user is already registered with the same mobile";
            return res.send(response);
        }

        customer_password = utility.encryptData(customer_password);

        let param={};
        param['customer_first_name']=first_name;
        param['customer_last_name']=last_name;
        param['customer_mobile']=customer_mobile;
        param['customer_email']=customer_email;
        param['customer_password']=customer_password;
        param['customer_address_locality']=customer_address_locality;
        param['customer_address_landmark']=customer_address_landmark;
        param['customer_address_district']=customer_address_district;
        param['customer_address_pincode']=customer_address_pincode;
        param['customer_address_state']=customer_address_state;
        param['customer_profile_pic']=customer_profile_pic;
         await dbquery.insertSingle("customer_master_details",param);  
        response['status']='success';
        response['mssg']='Successfully registered';
        // response['data']=result;
        return res.send(response);
    }
    catch(error)
    {
        console.log(error);
    }
}]

 
exports.customer_login=[async(req,res)=>{
    try{
         //(mobile or email) and password
         let input= req.body.inputData; 
         let customer_email = input.customer_email;
         let customer_password = input.customer_password;
         let response={};
         if(utility.checkEmpty(customer_password))
         {
             response['status']='error';
             response['mssg']='Enter password to login';
             return res.send(response);
         }
         if(utility.checkEmpty(customer_email))
         {
             response['status']='error';
             response['mssg']='Enter email to login';
             return res.send(response);
         }

         if(!utility.checkEmpty(customer_email,customer_password))
         {
             let authentication_status= await methods.authentication_status(customer_email,customer_password);
             if(!authentication_status)
             {
                 response['status']='error';
                 response['mssg'] = 'Wrong Email or Password';
                 return res.send(response);
                }
                
            let user_id = await methods.user_id(customer_email);
            //name, image
            let details = await dbquery.getIdMobileEmailPassUsingEmail(customer_email);
            console.log(details);
            let profile_pic = details.customer_profile_pic;
            let first_name = details.customer_first_name;
             response['status']='success';
             response['mssg']='';
             response['data']={};
             response['data']['user_id']=user_id;
             response['data']['profile_pic']=profile_pic;
             response['data']['first_name']=first_name;
             return res.send(response);
         }

          
    }
    catch(error)
    {
        console.log(error);
    }
}]


exports.addfeedback=[async(req,res)=>{
    try{
        let user_id= req.headers.user_id;
        let response={};
        let id_arr = user_id.split(":::");
        let customer_id = id_arr[1];
        let input = req.body.inputData;
        let product_id = input.product_id;
        let product_rating = input.product_rating;
        let product_feedback = input.product_feedback;
        let params={};
        params['customer_id']=customer_id;
        params['product_id']=product_id;
        params['product_rating']=product_rating;
        params['product_feedback']=product_feedback;
        dbquery.insertSingle("feedback_details",params);
        
        //add the rating to product table
        let present_product_average_rating = await dbquery.present_product_average_rating(product_id);
        present_product_average_rating=present_product_average_rating.product_average_rating;
        present_product_average_rating=parseInt(present_product_average_rating);
        let update_rating_to = ((present_product_average_rating+product_rating)/2);
        let update_product_rating_table = dbquery.update_product_rating(update_rating_to,product_id);

        response['status']='success';
        response['mssg']='successfully inserted feedback in feedback table as well as in product table';
        return res.send(response);
    }
    catch(error)
    {
        console.log(error);
    }
}]

exports.readfeedback = [async(req,res)=>{
    try {
        let user_id= req.headers.user_id;
        let response={};
        let id_arr = user_id.split(":::");
        let customer_id = id_arr[1];
        let input = req.body.inputData;
        let max_limit = input.max_limit;
        let feedback = await dbquery.read_feedback_to_limits(customer_id,max_limit);
        // console.log(feedback);
        if(utility.checkEmpty(feedback))
        {
            response["status"]="error";
            response["mssg"]="No Feedback To Show";
            return res.send(response);
        }
        response["status"]="success";
        response["mssg"]="";
        response["data"]=feedback;
        return res.send(response);
        
    } catch (e) {
        console.log(e);
    }
}]

exports.removefeedback = [async(req,res)=>{
    try {
        let user_id= req.headers.user_id;
        let id_arr = user_id.split(":::");
        let response={};
        let customer_id = id_arr[1];
        let input = req.body.inputData;
        let feedback_id=input.feedback_id;
        let match_if_feeback_exist_for_user_id = await dbquery.check_if_feedback_id_and_user_id_is_right_or_not(customer_id,feedback_id);
        if(utility.checkEmpty(match_if_feeback_exist_for_user_id))
        {
            response["status"]="error";
            response["mssg"]="No Feedback is There For User Id";
            return res.send(response);
        }
        dbquery.remove_feedback(customer_id,feedback_id);
        response["status"]="success";
        response["mssg"]="Deleted The Feedback Successfully";
        return res.send(response);
    } catch (e) {
        console.log(e);
    }
}]