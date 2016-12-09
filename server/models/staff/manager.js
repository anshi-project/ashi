var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Staff = require("./main")
var Team = require("../team/team");

var _ = require("lodash");

var divisions = require("../../locals/fields/enums").teams.divisions
var apparel = require("../commonFields/apparel").staff

var gmSchema = new Schema({
  division: [{ type: String, enum: divisions }],
  apparel
})


module.exports=Staff.discriminator("Manager",gmSchema);
