const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const app = express();

app.use(cors());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:true
    }));
 
app.use('/customers', require("./_Customers/customer.router"));
app.use('/users', require("./_Users/user.router"));
app.use('/bills', require("./_Bills/bill.router"));
app.use('/checkups', require("./_Checkups/checkup.router"));

app.listen(3000, ()=>{
    console.log("server running on port 3000...");
});