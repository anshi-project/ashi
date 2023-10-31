var express=require("express");
var app = express();
var MongoStore = require("connect-mongo")(express);

var exphbs = require('express-handlebars');

var hbs = exphbs.create({
	helpers:require("./server/views/helpers/index"),
	defaultLayout:"main",
	layoutsDir:"./server/views/layouts",
	partialsDir:"./server/views/partials"
})

var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var session = require('express-session');
var methodOverride = require("method-override");


var port = process.env.PORT || 3000;

require("dotenv").config();


mongoose.Promise=require("bluebird");
mongoose.connect(process.env.mongoURI);

app.use(methodOverride('_method'));


app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({resave:false,
				saveUninitialized:true,
				secret:process.env.cookie_secret,
				store:new MongoStore({mongooseConnection:mongoose.connection})
	});
);

app.engine('handlebars', hbs.engine);
app.set("views","./server/views")
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

require("./server/config/passport")(app);

require("./server/routes/index")(app);

app.listen(port,function(){
	console.log("Server up and running")
});
