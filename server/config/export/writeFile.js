var fs = require("fs");
var json2csv=require("json2csv");

module.exports=function(filename,data,type,next){
	var fields=require(type).json2csv;	
	
	var csv = json2csv({data, fields})
	var path = filename+".xlsx";

	fs.writeFile(path, csv, function(error){
		if(error) return next(error);
		return next(null,path);
	});
}
