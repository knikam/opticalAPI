const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:true
    }));
 
app.use('/customers', require("./_routers/customer.router"));
app.use('/users', require("./_routers/user.router"));
app.use('/bills', require("./_routers/bill.router"));

app.listen(3000, ()=>{
    console.log("server running on port 3000...");
});