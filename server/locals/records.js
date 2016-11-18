var _ = require("lodash");

var player = require("../models/players/main")
var coach = require("../models/staff/coach");
var manager = require("../models/staff/manager");
var Team = require("../models/team/team");

var Models = {player,coach,manager};

var getDivision = require("./fields/teams").getDivision



exports.handleTeamChange = function(type, id, update, next) {
	var Model = Models[type];

	Model.updateTeamRecords(id, update, function(data){
		return next(data)
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
			if (err) return next("There was an error Adam");

			fields.forEach((obj) => {
				obj.value = _.result(doc, obj.name);
				obj.list =  obj.radio || obj.checkbox || obj.dropdown || null;
			})
			
			fields = _.partition(fields, "fields2")
			return next(null, fields[1],fields[0], doc);
		})
	}
	//render an editable/populated form of a persons records 