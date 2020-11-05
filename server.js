const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:true
    }));
 
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

require("./_routers/customer.js")(app);

app.listen(3000, ()=>{
    console.log("server running on port 3000...");
});