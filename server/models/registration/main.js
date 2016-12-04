var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parse = require("saymyname")
var Method = require("./methods");

var registrationSchema = new Schema({
	firstname: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 2,
    maxlength: 40,
  },
	lastname: {
    type: String,
    required: true,
    lowercase: true,
    minlength:2,
    maxlength: 40,
  },  
    contact: {},
	public_data: {}},
 {
	timestamps: true
});

registrationSchema.plugin(require("../plugins/setFullName"))
registrationSchema.plugin(require("../plugins/phonenumber"))

registrationSchema.statics.assignToTeam = Method.assignToTeam;

registrationSchema.statics.findRegisteredPlayers = Method.findRegisteredPlayers;
//fetches player registrations as well as returning players from previous seasons


module.exports = mongoose.model("registration", registrationSchema);