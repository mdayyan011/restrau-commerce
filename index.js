const express = require("express");
const bodyParser=require("body-parser");
const app = express();
const DataRouter= require("./routes/routes");

app.listen(3892,()=>{
    console.log("Server is running at 3892");
});

app.use(bodyParser.json());
app.use("/",DataRouter);