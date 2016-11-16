module.exports=function(app){

	app.get("/gm/index", function(req, res) {
		res.render("manager/menu", {
			gm: req.user
		});
	})
	
	require("./roster")(app);
}