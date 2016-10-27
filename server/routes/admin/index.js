var passport=require("passport");

module.exports=function(app){
	app.get("/login/admin",function(req,res){
		res.render("admin/login")
	})
	app.post('/login/admin', passport.authenticate('admin-local', 
		{successRedirect:'/admin/index',failureRedirect: '/login/admin'}));
    
    app.get("/admin/index",function(req,res){
    	res.render("admin/menu",{admin:req.user});
    })                                                	
	app.get("/logout",function(req,res){
  		req.logOut();
  		res.redirect("/")
  	})
	require("./teampicker")(app);
	require("./applications")(app)
	require("./roster")(app);
	require("./create_admin")(app);
}