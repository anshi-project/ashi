var _ = require("lodash");

var teamData = [
	{division: "Junior's",name: "U16"},
	{division: "Junior's",name: "U18"}, 
	{division: "Junior's",name: "U20"}, 
	{division: "Men's",name: "Men's Team USA"}, 
	{division: "Women's",name: "Women's Team USA"}, 
	{division: "Men's Master's",name: "Men's Master's Team USA"}, 
	{division: "Men's Master's",name: "Men's Master's Team DC"}, 
	{division: "Women's Master's",name: "Women's Team Red"}, 
	{division: "Women's Master's",name: "Women's Team Blue"}
]
//main config of teams that the rest of the application must reference


function getKey(_name){
	var name = _name.replace(/\'/g,"");
	name = name.toLowerCase();
	return name.split(" ").join("-")
}

exports.getDivision = function(teamName){
 	var obj = _.find( teamData, {name: teamName});
 	if(!obj) return "Junior's"
 	return obj.division;
 }

exports.names = teamData.map(t => {return t.name})


exports.namesAndKeys = teamData.map(t => {
	return {
		name:t.name,
		key:getKey(t.name)
	}
})


exports.divisions = teamData.reduce((a, b) => {
	if (a.indexOf(b.division) == -1) {
		a.push(b.division);
	}
	return a;
}, [])


exports.getTeamsInDivision = (division) =>{
	var len = Array.isArray(division)? division.length : 1;

	return teamData.reduce(function getTeams(a,b){
		if(b.division == division){
			a.push(b.name)
		}
		return a;
	},[])
}