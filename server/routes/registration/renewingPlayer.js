var Player=require("../../models/players/main");
var format=require("form-data-to-object");

module.exports=function(app){
    app.get("/register/player/renew",function(req,res){
        res.render("reg/returning",{layout:"main"})
    })

    app.post("/register/player/renew",function(req,res){
        var query=format(req.body)

        Player.findOne(query,function(err,player){
            res.send(player)
            // if(err || !player){
            //     return res.send("ERROR")
            // }else{
            //     player.status="renewing membership";
            //     player.save();
            //     res.render("reg/thankyou");
            // } 
        })
    }) 
}