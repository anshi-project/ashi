module.exports=function(app){

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


    app.get("/",function(req,res){
        res.render("index")
    });

    require("./email")(app);
    require("./auth")(app);
    require("./player_records/index")(app);
    require("./registration")(app);
    require("./admin/index")(app);
    require("./manager/index")(app);
    require("./stats/index")(app);
}
