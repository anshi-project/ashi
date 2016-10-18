module.exports=function(app){
	
	app.use("/admin",function(req,res,next){
		console.log("Admin route");
		next();
	})
	
	require("./teampicker")(app);
	require("./roster")(app);
	require("./create_admin")(app);
}