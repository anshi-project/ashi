var path=require("path");
var express=require("express");
var app=express();
var exphbs=require('express-handlebars');

var mongoose=require("mongoose");
var passport=require('passport');
var bodyParser=require('body-parser');
var session=require('express-session');

require("dotenv").config();


mongoose.Promise=require("bluebird");
mongoose.connect(process.env.mongoURI);

app.use(bodyParser.urlencoded({ extended:true}));
app.use(session({secret:process.env.cookie_secret,saveUninitialized:true,resave:false}));


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));


require("./routes/index")(app);
require("./routes/registration")(app);
require("./routes/admin")(app);
// app.listen(process.env.PORT||3000);
app.listen(8081);