module.exports=function(app){
    require("./api")(app);
    require("./scorecard")(app);
}