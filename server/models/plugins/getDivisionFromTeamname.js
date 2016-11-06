var _=require("lodash");
var teams=require("../../locals").teams

module.exports=function(){
	var self=this;
	return _.find(teams,v=>{return v.name==self.team.name}).division; 
}