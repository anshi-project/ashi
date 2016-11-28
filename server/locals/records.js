var _ = require("lodash");

var player = require("../models/players/main")
var coach = require("../models/staff/coach");
var manager = require("../models/staff/manager");
var admin = require("../models/staff/admin");
var Team = require("../models/team/team");

var Models = {player,coach,manager,admin};

var getDivision = require("./fields/teams").getDivision



exports.handleTeamChange = function(type, id,prev, update, next){
	var Model = Models[type];

	Model.updateTeamRecords(id,prev, update, function(err, data){
		return next(err, data)
	})
}


exports.handleUpdate = function(type, id, update,next) {
	var Model = Models[type];

	Model.findById(id).update(update).exec(function(err){
		if(err) return next(err);
		return next(null);
	})
}



exports.render = function(type, id, next) {
	var _fields = require(`./fields/${type}`);
	var fields = _.reject(_fields, "registration_only");
		
	var Model = Models[type];

	Model.findById(id).lean().exec(function(err, doc) {
		if (err) return next(err);

		fields.forEach((obj) => {
			obj.value = _.result(doc, obj.name);
			obj.list =  obj.radio || obj.dropdown || null;
		})
		
		
		return next(null, fields, doc);
	})
}
	//render an editable/populated form of a persons records 