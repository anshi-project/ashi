module.exports=function(app){


    app.get("/",function(req,res){
        res.render("index",{layout:"main"})
    }); 
    
    require("./auth")(app);    
    require("./email")(app);
    require("./settings")(app);
    require("./player_records/index")(app);
    require("./registration")(app);
    require("./admin/index")(app);
    require("./manager/index")(app);
    require("./stats/index")(app);

    app.get("*",function(req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });
    
    app.use(function(error,req,res,next){
        if(!error){
            return next();
        }else if(error.status==404){
            res.status(404);
            return res.render("error",{title:"404",message:"The page you are looking for does not exist."})
        }else{
            res.render("error",{title:"Error",message:"An error has occured"})
        }
    })
}
