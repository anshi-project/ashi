var cors = require("cors");
var whitelisted = process.env.origins.split(" ");
var options = {origin: whitelisted};




module.exports = cors(options)