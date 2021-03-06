var _ = require("lodash");
var fs = require("fs");
var path = require("path");

function getFields(type){
  var fields = require(`./fields/${type}`);
  return _.reject(fields, (field)=>{ return field.recordOnly})
}

function getLabels(fields){
  var commas = new RegExp(",", "g")
  var str="";
  for(var i=0; i< fields.length; i++){
    var currLabel = fields[i].label;
    str+= currLabel.replace(commas, "")+", ";
  }
  return str+"\n";
}

function formatter(type){
    var fields = getFields(type);
  	var str = getLabels(fields);
    //init the csv string

  	return function(doc){
  		if(arguments.length == 0){
  			return str;
  		}else{
  			for(var i = 0; i<fields.length; i++){
          var result = _.result(doc,fields[i].name) || "N/A" ;
          if(typeof result == "string") result = result.replace(/\,/g, " ")
          //commas within string results are replaces so as to not ruin the CSV file's format 
  				str += `${result} , ` 
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
  if (typeOfApplicant === 'admin') fields.admin = true;
  return fields;
}

exports.writeCSV = function(type, next){
  var Registration = require(`../models/registration/_${type}Reg`)
  var filename = path.resolve(__dirname, "../bin/temp.xlsx")
  var csv = formatter(type);

  Registration.find({}).exec((e,docs) =>{
  	if(e) return next(String(e));
    docs.forEach(doc =>{
  		csv(doc);
  	})

  	fs.writeFile(filename, csv(), function(err){
  		if(err) return next(String(err));
  		return next(null,filename);
  	})
  })
}


exports.renderCompletedForm = function(type,id,next){
	var _fields = getFields(type);
	var Registration = require(`../models/registration/_${type}Reg`);

	Registration.findById(id).exec(function(err,doc){
		if(err) return next("Something went wrong while fetching from the database");

    if(!doc) return next(`Couldn't find a registration matching the id: ${id}`);
    
    doc.contact.passport_exp = doc.contact.passport_expiration;
		
    var fields = _fields.reduce((prev,curr)=>{
			prev[curr.label] = _.result(doc, curr.name);
			return prev;
		},{})

		return next(null,fields);
	})
}
