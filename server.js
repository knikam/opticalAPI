const exPress = require("express");
const bodyParser = require("body-parser");

const app = exPress();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req, res)=>{
    res.json({message:"welcome to optica"});
});

app.listen(3000, ()=>{
    console.log("server running on port 3000...");
});