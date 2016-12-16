var cors = require("cors");
var whitelisted = process.env.origins.split(" ")
var options;

if(process.env.NODE_ENV !== "development"){
	 options = {
		origin:["http://codepen.io", "http://localhost:3000"]
	}
}else{
	options = {origin: whitelisted}
}




module.exports = cors(options)