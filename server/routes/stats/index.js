module.exports=function(app){
    require("./api")(app);
    require("./scorecard")(app);
    
    app.get("/show",function(req,res){
    
        var Team=require("../../models/team/team")
        Team.findOne({name:"U20"}).populate("players").exec(function(e,d){
            
            res.send(d)
        })
    })
    
}