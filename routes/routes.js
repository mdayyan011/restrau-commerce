const express = require("express");
const middlewares = require("../middlewares/middlewares");
const customer_controller = require('../controllers/CustomerController');
const admin_controller = require('../controllers/AdminController');
const app = express();
app.use(middlewares);
 
app.use('/register/customer',customer_controller.customer_register);
app.use('/login/customer',customer_controller.customer_login);
app.use('/addFeedback',customer_controller.addFeedback);
app.use('/readOwnFeedback',customer_controller.readOwnFeedback);
app.use('/removeFeedback',customer_controller.removeFeedback);
app.use('/readProduct',customer_controller.readProduct);
app.use('/readOthersFeedback',customer_controller.readOthersFeedback);
app.use('/addToCart',customer_controller.addToCart)
app.use('/countProductInCart',customer_controller.countProductInCart);
app.use('/removeFromCart',customer_controller.removeFromCart);
app.use('/readCart',customer_controller.readCart);

//***************** A D M I N     R O U T E S*************/
app.use('/admin/login',admin_controller.admin_login);
app.use('/admin/addProduct',admin_controller.addProduct);
app.use('/admin/removeProduct',admin_controller.removeProduct);

module.exports= app;