const express = require("express");
const middlewares = require("../middlewares/middlewares");
const customer_controller = require('../controllers/CustomerController');

const app = express();
app.use(middlewares);

//+++++++++++++ CUSTOMER REGISTRATION ++++++++++++++++++++
app.use('/register/customer',customer_controller.customer_register);


module.exports= app;