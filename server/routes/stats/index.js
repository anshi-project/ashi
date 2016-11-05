var getShow = require("./callbacks/getShow");

module.exports=function(app){
    require("./api")(app);
    require("./scorecard")(app);

    app.get("/show", getShow);

}
