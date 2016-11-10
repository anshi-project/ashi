var fs = require("fs");
var json2csv=require("json2csv");
var path=require("path");

module.exports=function(data,next){
	var fields=require("./fields").players;
	var filename=path.resolve(__dirname,"../../../bin/gm/temp.xlsx");
	var csv=json2csv({data,fields})

        fs.writeFile(filename,csv, function(error){
	    	if(error) return next(error);
		    return next(null,filename);
	    }); 
}