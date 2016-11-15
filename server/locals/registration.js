var _ = require("lodash");
var fs = require("fs");
var path = require("path");

function getFields(type){
  var fields = require(`./fields/${type}`);
  return _.reject(fields, "recordOnly")  
}


function formatter(type){
    var fields = getFields(type);
  	var fieldnames = _.map(fields, "label");
  	var str = fieldnames.join(", ")+"\n";
 
  	return function(doc){
  		if(arguments.length == 0){
  			return str;
  		}else{
  			for(i = 0; i<fields.length; i++){
  				str += (_.result(doc,fields[i].name)|| "N|A") +", "
  			}
  			str+="\n";
  		}	
  	}
}

exports.renderForm = function(typeOfApplicant){
	var fields = getFields(typeOfApplicant);

	fields.forEach(function(p){
    	p["required"] = p.hasOwnProperty('required')? p.required : true;
    	p["type"] = p.hasOwnProperty('type')? p.type : "text";
	})

	return _.chunk(fields, 8);
}

exports.writeCSV = function(type, next){
  var Registration = require(`../models/registration/_${type}Reg`)
  var filename = path.resolve(__dirname, "../bin/temp.xlsx")
  var csv = formatter(type);
 
  Registration.find({}).exec((e,docs) =>{
  	docs.forEach(doc =>{
  		csv(doc);
  	})
  	
  	fs.writeFile(filename, csv(), function(err){
  		if(err) return next(err);
  		return next(null,filename);
  	})
  })
}


exports.renderCompletedForm = function(type,id,next){
	var _fields = getFields(type);
	var Registration = require(`../models/registration/_${type}Reg`);

	Registration.findById(id).exec(function(err,doc){
		if(err) return next(err);

		var fields = _fields.reduce((prev,curr)=>{
			prev[curr.label] = _.result(doc, curr.name);
			return prev;
		},{})

		return next(null,fields);
	})
}
