const express = require("express");
const middlewares = require("../middlewares/middlewares");
const customer_controller = require('../controllers/CustomerController');
const admin_controller = require('../controllers/AdminController');
const app = express();
app.use(middlewares);
 
app.use('/register/customer',customer_controller.customer_register);
app.use('/login/customer',customer_controller.customer_login);
app.use('/addfeedback',customer_controller.addfeedback);
app.use('/readfeedback',customer_controller.readfeedback);
app.use('/removefeedback',customer_controller.removefeedback);



app.use('/admin/addproduct',admin_controller.add_product);
module.exports= app;