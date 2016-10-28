var express=require("express");
var app=express();
var MongoStore=require("connect-mongo")(express);

var exphbs=require('express-handlebars');


var mongoose=require("mongoose");
var bodyParser=require('body-parser');
var cookieParser=require("cookie-parser");
var session=require('express-session');

require("dotenv").config();



mongoose.Promise=require("bluebird");
mongoose.connect(process.env.mongoURI);

app.locals=require("./locals");

app.use(bodyParser.urlencoded({ extended:true}));
app.use(cookieParser());

app.use(session({resave:false,
				saveUninitialized:true,
				secret:process.env.cookie_secret,
				store:new MongoStore({mongooseConnection:mongoose.connection})
	})
);


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

require("./config/passport")(app);
require("./routes/index")(app);
require("./routes/registration")(app);
require("./routes/admin/index")(app);
require("./routes/manager/index")(app);
require("./routes/stats/index")(app);
require("./routes/player_records/index")(app);


app.listen(process.env.PORT|| 8080, () => console.log('port 8080 => Adam')); 
// app.listen(8081, () => console.log('port 80 81 => Manolo')); 



