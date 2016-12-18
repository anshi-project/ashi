module.exports=function(app){
	require("./default")(app);
	require("./renewingPlayer")(app);

	app.get("/submitted",function(req,res){
		res.render("submitted",{layout:"main"})
	})
}