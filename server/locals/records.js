var _ = require("lodash");

var player = require("../models/players/main")
var coach = require("../models/staff/coach");
var manager = require("../models/staff/manager");
var admin = require("../models/staff/admin");
var Team = require("../models/team/team");

var Models = {player,coach,manager,admin};

var getDivision = require("./fields/teams").getDivision

function getTeamField(type){
	if(type=="player"|| type=="manager") return type+"s";
	return "coaches"
}



exports.handleTeamChange = function(type, id,prev, update, next){
	var Model = Models[type];
	var teamField = getTeamField(type); 

	Model.findByIdAndUpdate(id, update)
		.then(() =>{
			if(type !=="manager"){
				Team.swap(prev, update.team.name , id, teamField)
			}else{
				prev = prev.split(",");
				update = update.division || [];
				
				Team.swapDivisions(prev, update, id)
			}
		})
		.then(() => { return next(null, "Successful Update")})
		.catch(() => { if(err) return next(err) })
}


exports.handleUpdate = function(type, id, update,next) {
	var Model = Models[type];

	Model.findByIdAndUpdate(id, update)
		.then(()=>{ return next(null, "Successful update")})
		.catch( err => { if(err) return next(err)})

}

function numArray(a,b,c){
	var arr= [a,b,c];
	for(var i=0; i<100; i++){
		if(i!=a && i!=b && i!=c){
			arr.push(i)
		}
	}
	return arr
}

exports.render = function(type, id, next) {
	var _fields = require(`./fields/${type}`);
	var fields = _.reject(_fields, "registration_only");
		
	var Model = Models[type];

	Model.findById(id).lean().exec(function(err, doc) {
		if (err) return next(err);


		fields.forEach((obj) => {
			if(obj.name=="team[jersey_number]"){
				var num = doc.hockey_info.jersey_number
				obj.list = numArray(num.choice1, num.choice2, num.choice3)
			}else{
				obj.list =  obj.radio || obj.dropdown || null;
			}
			obj.value = _.result(doc, obj.name);

		})
		
		return next(null, fields, doc);
	})
}
	//render a pre-populated form of a persons records for editting a members details 