var passport=require("passport");

module.exports=function(app){
    
    app.get("/admin/index",function(req,res){
    	res.render("admin/menu",{admin:req.user,layout:"spreadsheet"});
    })                                                	
  		
	require("./teampicker")(app);
	require("./applications")(app)
	require("./roster")(app);
	require("./permissions")(app);
	require("./records")(app);
}