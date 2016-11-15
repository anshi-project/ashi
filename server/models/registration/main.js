var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parse = require("saymyname")
var Method = require("./methods");

var registrationSchema = new Schema({
	firstname: {
		type: String,
		lowercase: true
	},
	lastname: {
		type: String,
		lowercase: true
	},
	apparel: {},
	contact: {},
	public_data: {},
	status: {
		type: String,
		default: "pending"
	} //pending,registered, saved for review
}, {
	timestamps: true
})


registrationSchema.plugin(require("../plugins/setFullName"))

registrationSchema.statics.assignCoach = Method.assignCoach;

registrationSchema.statics.assignPlayer = Method.assignPlayer;

registrationSchema.statics.handleFormSubmission = Method.handleFormSubmission;
//creates new registration, sets correct fields by passing in a particular discriminator type
registrationSchema.statics.findRegisteredPlayers = Method.findRegisteredPlayers;
//fetches a list by a particular type


module.exports = mongoose.model("registration", registrationSchema);