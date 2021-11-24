const { urlencoded } = require("express");
const express = require("express");
const bodyParser=require("body-parser");
const app = express();
const DataRouter= require("./routes/routes");

app.listen(3000,()=>{
    console.log("Server is running at 3000");
});

app.use(bodyParser.json());
app.use("/",DataRouter);