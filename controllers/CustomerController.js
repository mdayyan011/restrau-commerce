const express=require("express");
const utility= require('../helpers/utility');
const message=require('../config/message');
const dbquery= require('../helpers/query');

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

        if(utility.checkPasswordFormat(customer_password))
        {
            response["status"]="error";
            response["msg"]=message.incorrect_password;
            return res.send(response); 
        }

        let param={};
        param['first_name']=first_name;
        param['last_name']=last_name;
        param['customer_mobile']=customer_mobile;
        param['customer_email']=customer_email;
        param['customer_password']=customer_password;
        param['customer_address_locality']=customer_address_locality;
        param['customer_address_landmark']=customer_address_landmark;
        param['customer_address_district']=customer_address_district;
        param['customer_address_pincode']=customer_address_pincode;
        param['customer_address_state']=customer_address_state;
        param['customer_profile_pic']=customer_profile_pic;
        //  dbquery.insert(req,param);
        let result= await dbquery.getUserData();

 

        response['status']='success';
        response['mssg']='Successfully registered';
        response['data']=result;
        return res.send(result);
    }
    catch(error)
    {
        console.log(error);
    }
}]

 