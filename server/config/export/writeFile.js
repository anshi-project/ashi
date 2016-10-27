var fs = require("fs");
var json2csv=require("json2csv");

module.exports=function(filename,$data,$fields,next){
	var fields=require($fields);	
	
	var csv = json2csv({data: $data, fields:fields})
	var path = filename+".xlsx";

	fs.writeFile(path, csv, function(error){
		if(error) return next(error);
		return next(null,path);
	});
}
