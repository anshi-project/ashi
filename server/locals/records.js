var _ = require("lodash");

var player = require("../models/players/main")
var coach = require("../models/staff/coach");
var manager = require("../models/staff/manager");
var Team = require("../models/team/team");

var Models = {player,coach,manager};

var getDivision = require("./fields/teams").getDivision

var handleTeamOrDivisionChange = function(type, prev, curr) {
	var params;
	var id = prev._id
	var position;

	if (type == "player") {
		position = curr.team.position;
	}

	if (type == "manager" && prev.division != curr.division) {
		Team.swap({division: prev.divison}, {divison: curr.divison}, id, "managers");
	} else if (prev.team.name != curr.team.name) {
		var a = {name: prev.team.name}
		var b = {name: curr.team.name} 
		
		if (type == "player") {
			var category = position != 'Goalie' ? "players" : "goalies";
			Team.swap(a, b, id, category);
		}else if(type == "coach"){
			Team.swap(a,b,id,"coaches");
		}
	}else{
		return null;
	}
}

exports.render = function(type, id, next) {
		var _fields = require(`./fields/${type}`);
		var fields = _.reject(_fields, "registration_only");
		var Model = Models[type];

		Model.findById(id).lean().exec(function(err, doc) {
			if (err) return next(err);

			fields.forEach((obj) => {
				obj.value = _.result(doc, obj.name)
			})
			return next(null, fields, doc);

		})
	}
	//render an editable/populated form of a persons records 

exports.handleUpdate = function(type, id, record) {
	var Model = Models[type];

	return function(update,next){
		handleTeamOrDivisionChange(type, record, update);

		if(type != "manager"){
			update.team.division = getDivision(update.team.name);
		}

		Model.findById(id).update(update).exec(function(err){
			if(err) return next(err);
			return next(null);
		})

	}
}