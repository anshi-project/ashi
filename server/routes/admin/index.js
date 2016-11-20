var passport=require("passport");

module.exports=function(app){
    
    app.get("/admin/index",function(req,res){
    	res.render("admin/menu",{admin:req.user,userType:"admin",layout:"user"});
    })                                                	
  		
	require("./teampicker")(app);
	require("./applications")(app)
	require("./roster")(app);
	require("./permissions")(app);
	require("./records")(app);
	require("./payments")(app);
}