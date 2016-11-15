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

exports.getDivision = function(teamName){
 	return _.find( teamData, {name: teamName})
 }

exports.names = teamData.map(t => {return t.name})

exports.divisions = teamData.reduce((a, b) => {
	if (a.indexOf(b.division) == -1) {
		a.push(b.division);
	}
	return a;
}, [])