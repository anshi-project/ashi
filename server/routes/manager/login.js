var passport=require("passport");

module.exports=function(app){
	app.get("/login/gm",function(req,res){
		res.render("manager/login");
	})

	app.post('/login/gm', passport.authenticate('manager-local', 
		{successRedirect:'/gm/index',
		failureRedirect: '/login/gm'}));
	
	app.get("/gm/index",function(req,res){
		res.render("manager/menu",{gm:req.user});
	})	

}