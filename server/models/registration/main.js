var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parse = require("saymyname")
var Method = require("./methods");

var nameSchema = require("../commonFields/name");

var registrationSchema = new Schema({
	firstname: nameSchema,
	lastname: nameSchema,  
    contact: {},
	public_data: {}
 },
 {
	timestamps: true
});

registrationSchema.plugin(require("../plugins/setFullName"))
registrationSchema.plugin(require("../plugins/phonenumber"))

registrationSchema.statics.assignToTeam = Method.assignToTeam;

registrationSchema.statics.findRegisteredPlayers = Method.findRegisteredPlayers;
//fetches player registrations as well as returning players from previous seasons


module.exports = mongoose.model("registration", registrationSchema);