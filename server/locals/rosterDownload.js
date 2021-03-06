var fs = require("fs");
var json2csv = require("json2csv");
var path = require("path");

var fields = [
	{label:"Name",value:"fullname"},
	{label:"#",value:"team.jersey_number"},
	{label:"Position",value:"team.position"},
	{label:"Email",value:"contact.email"},
	{label:"Phone",value:"contact.phone1"},
	{label:"Age",value:"public_data.age"},
	{label:"Height",value:"public_data.height"},
	{label:"Weight",value:"public_data.weight"},
	{label:"Hometown",value:"background.hometown"},
	{label:"Shooting Hand",value:"team.shooting_hand"},
	{label:"Shirt size",value:"apparel.shirt"},
	{label:"Sock size",value:"apparel.socks"},
	{label:"Jacket size",value:"apparel.jacket"},
	{label:"Hat size",value:"apparel.hat"},
	{label:"Polo size",value:"apparel.polo"},
	{label:"Shorts size",value:"apparel.shorts"},
	{label:"Jersey size",value:"apparel.jersey"},
	{label:"Headshot",value:"headshot"},
	{label:"Paid",value:"paid"}
]

module.exports=function(data,next){
	var filename = path.resolve(__dirname,"../bin/temp.xlsx");
	var csv = json2csv({data,fields})

        fs.writeFile(filename,csv, function(error){
	    	if(error) return next(String(error));
		    return next(null,filename);
	    }); 
}
