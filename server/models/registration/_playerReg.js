var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Registration = require("./main");

var fields = require("../commonFields/index")

var enums = require("../../locals/fields/enums")

var PlayerReg = Registration.discriminator("player-registration",
  new Schema({   
    apparel: fields.apparel.player, 
    public_data: fields.public_data,
    contact: fields.contact.player,
    background: fields.background.player,
    favorite: fields.favorite,
    hockey_info: fields.hockey_info
  })
);
module.exports = PlayerReg;
