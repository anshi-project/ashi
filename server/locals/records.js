var _ = require("lodash");


module.exports = function(type,queryResults){
   var _model = require(`./fields/${type}`);
   var model = _.reject(_model, "registration_only");

   model.forEach((object)=>{
   	object.value = _.result(queryResults, object.name)
   })
   return model;
}