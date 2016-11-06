var writeCSV=require("../../config/export/writeFile");
var path=require("path");

module.exports=function(app){
  
  app.get("/admin/applications",function(req,res){
      res.render("admin/registered_users/applicant_list")
  })



	app.get("/admin/applications/:type",function(req,res){
    var type=req.params.type
    var Registration=require("../../models/registration/_"+type+"Reg");
    var _path=path.resolve(__dirname,"../../bin/reg");
    var fields="./fields/"+type;

		Registration.find({},function(err,data){
      var _file=_path+"/registration-"+type;
      writeCSV(_file,data,fields,function(e,file){
        res.download(file);
      })			
		})
	})

}

    // app.get("/seed",function(req,res){
    //    var Registration = require("../../models/registration/_playerReg");
    //    var Player = require("../../models/players/main");

    //    Player.findOne({},"-_id -__t -__v").lean().exec(function(e,doc){
    //         var arr=[doc];
    //         app.locals.players.forEach(function(player){
    //             var p=Object.assign({},doc, player);
    //             p.hockey_info.team="U20";
    //             p.hockey_info.position="Goalie";
    //             Registration.create(p,function(err,d){if(err) console.log(err)});
    //         })
    //         res.send(arr);
    //     })
    // })