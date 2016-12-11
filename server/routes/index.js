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
       
        res.render("index",{layout:"main"})
        
    });

    app.get("/seed",function(req,res,next){
        var name = req.query.name;

        var Registration = require("../models/registration/_playerReg")
        var seed = require("../locals/seed")(req.query.name)
        
        var reg = new Registration(seed);
        reg.save(function(err,doc){
            if(err) console.error(String(err));
            res.send(doc)
        })   
        
    })//TEMPORARY FUNCTIONS TO QUICKLY CREATE A NEW PLAYER REG FORM   

    app.get("/seed-coach",function(req,res){
        var name = req.query.name;       
        var Registration = require("../models/registration/_coachReg")
        var seed = require("../locals/seed.coach")(req.query.name)
        
        var reg = new Registration(seed);
        reg.save(function(err,doc){
            if(err) console.error(String(err));
            res.send(doc)
        })     
    })//TEMPORARY FUNCTIONS TO QUICKLY CREATE A NEW COACH FORM   
    
    require("./auth")(app);    
    require("./email")(app);
    require("./settings")(app);
    require("./player_records/index")(app);
    require("./registration")(app);
    require("./admin/index")(app);
    require("./manager/index")(app);
    require("./stats/index")(app);

    

     app.get("/*", function errorHandler (err, req, res, next) {
      if (res.headersSent) {
        return next(err)
      }
      res.status(500)
      res.send("An error has occurred");
    })
}
