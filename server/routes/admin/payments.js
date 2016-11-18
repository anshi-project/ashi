var Player=require("../../models/players/main")
var _=require("lodash");

module.exports=function(app){

  app.get("/admin/payments", function(req,res){
    Player.find({},"firstname lastname team paid contact.email contact.phone1")
      .sort({paid:1,lastname:1})
      .lean()
      .exec((err,docs) => {
        
        if(err) throw err;
        res.render("admin/payments",{layout:"spreadsheet",player:docs});
      })  
  })

  app.put("/admin/payments/:id",function(req,res){
  	var id = req.params.id;

  	Player.findByIdAndUpdate(id, req.body, {new:true, upsert:true}, function(err){
  		if(err){
  			res.send("Error updating payment status").status(500)
  		}else{
  			res.send("Success").status(200)
  		}
  	})
  })
}