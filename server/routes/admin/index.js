var passport=require("passport");

module.exports=function(app){
	app.get("/admin-login",function(req,res){
		res.render("admin/login")
	})
	app.post('/admin-login', passport.authenticate('admin-local', {successRedirect:'/admin/index',failureRedirect: '/admin-login'}));
    
    app.get("/admin/index",function(req,res){
    	res.render("admin/menu",{admin:req.user});
    })                                                	
	app.get("/logout",function(req,res){
  		req.logOut();
  		res.redirect("/")
  	})
	require("./teampicker")(app);

	require("./roster")(app);
	require("./create_admin")(app);
}