module.exports=function(app){


    app.get("/",function(req,res){
        res.render("index")
    }); 
    
    require("./auth")(app);    
    require("./email")(app);
    require("./settings")(app);  
    require("./stats/index")(app);
    require("./player_records/index")(app);
    require("./registration")(app);
    require("./admin/index")(app);
    require("./manager/index")(app);
   
    app.get("*",function(error,req, res, next){
        if(error && error.status != 404) return next(error)
        
        res.render("error",{title:"404",message:"The page you are looking for could not be located"})
    });

    app.use(function(error,req,res,next){
        console.log(String(error))
        res.render("error",{title:error.status, message:error.msg})
    })
}
