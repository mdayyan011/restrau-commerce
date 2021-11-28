const express = require("express");
const middlewares = require("../middlewares/middlewares");
const customer_controller = require('../controllers/CustomerController');

const app = express();
app.use(middlewares);
 
app.use('/register/customer',customer_controller.customer_register);
app.use('/login/customer',customer_controller.customer_login);


module.exports= app;