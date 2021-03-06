var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Method = require("./methods");

var nameSchema = require("../commonFields/name");

var registrationSchema = new Schema({
	firstname: nameSchema,
	lastname: nameSchema
 },
 {
	timestamps: true
});

registrationSchema.plugin(require("../plugins/virtuals"))

registrationSchema.statics.assignToTeam = Method.assignToTeam;
registrationSchema.statics.findRegisteredPlayers = Method.findRegisteredPlayers;
//fetches player registrations as well as returning players from previous seasons

module.exports = mongoose.model("registration", registrationSchema);