var path=require("path");
var express=require("express");
var app=express();

var mongoose=require("mongoose");
var passport=require('passport');
var bodyParser=require('body-parser');
var session=require('express-session');

require("dotenv").config();
mongoose.connect(process.env.mongoURI);

app.use(bodyParser.urlencoded({ extended:true}))

app.use(express.static(path.resolve(__dirname, 'public')));

require("./routes/index")(app);


app.listen(process.env.PORT||3000);