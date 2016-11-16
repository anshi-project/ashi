module.exports=function(app){
    
    app.get("/",function(req,res){
        res.render("index")
    });
    
    require("./auth")(app);
    require("./player_records/index")(app);
    require("./registration")(app);
    require("./admin/index")(app);
    require("./manager/index")(app);
    require("./stats/index")(app);   
}

 