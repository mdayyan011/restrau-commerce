const express = require("express");
const middlewares = require("../middlewares/middlewares");
const customer_controller = require('../controllers/CustomerController');
const admin_controller = require('../controllers/AdminController');
const app = express();
app.use(middlewares);
 
app.use('/register/customer',customer_controller.customer_register);
app.use('/login/customer',customer_controller.customer_login);

// ********************f e e d b a c k **************
app.use('/addFeedback',customer_controller.addFeedback);
app.use('/readFeedback',customer_controller.readFeedback);
app.use('/removeFeedback',customer_controller.removeFeedback);

//****************** p r o d u c t */
app.use('/readProduct',customer_controller.readProduct);

//*************** C A R T */
app.use('/addToCart',customer_controller.addToCart)


//***************** A D M I N     R O U T E S*************/
app.use('/admin/login',admin_controller.admin_login);
app.use('/admin/addProduct',admin_controller.addProduct);
app.use('/admin/removeProduct',admin_controller.removeProduct);

module.exports= app;