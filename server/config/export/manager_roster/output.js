var fs = require("fs");
var json2csv=require("json2csv");
var path=require("path");

module.exports=function(_data,next){
	var fields=require("./fields");
	var filename=path.resolve(__dirname,"../../../bin/gm/temp.xlsx");
	var csv=""
	
     _data.forEach(function(team){
         var title=team.name+":\n\n";
         var players = "\tPlayers:\n"+ json2csv({data: team.players, fields:fields.players})+"\n"
         var coaches= "\tCoaches:\n"+ json2csv({data: team.coaches, fields:fields.coaches})+"\r\r"
         csv+=title+players+coaches
    })
        fs.writeFile(filename,csv, function(error){
	    	if(error) return next(error);
		    return next(null,filename);
	    }); 
}