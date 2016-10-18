var Registration=require("../../models/registration/main");

module.exports=function(app){
    
    app.get("/admin/assign/:type",function(req,res){
        var type=req.params.type
        
        
        Registration.findPending(type,function(err,docs){
            if(err)throw err;
            res.render("admin/teampicker/"+type,{applicants:docs})
        })
    })

    
    app.get("/admin/demo/assign/:type",function(req,res){
        var type=req.params.type;
        var players=require("../helpers/seed").players;
        
        res.render("admin/teampicker/_"+type,{applicants:players})
    })    



    app.post("/admin/assign/returning-player",function(req,res){
        var id=req.query.id;
        var Player=require("../../models/players/main");

        Player.reassign(id,req.body);

        res.send(req.body);
    })

    
    app.post("/admin/assign/:type",function(req,res){
        var id=req.query.id;
        var format=require("../helpers/admin").getType;
        var type=format(req.params.type);
        
        Registration.assignRole(id,req.body,type)

        res.send(req.body);
    }) 

}