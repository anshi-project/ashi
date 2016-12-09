var renderCompletedForm = require("../../locals/registration").renderCompletedForm;
var writeCSV = require("../../locals/registration").writeCSV;

module.exports=function(app){

  app.get("/admin/applications/:type/view",function(req,res){
      var id = req.query.id;
      var type = req.params.type;

      renderCompletedForm(type,id,function(err,data){
        if(err) throw err;
        res.send(data);
      })
  })

	app.get("/admin/applications/:type",function(req,res){
    var type=req.params.type
    writeCSV(type, function(err,file){
      if(err) throw err;
      res.download( file,`${type} Applications.xlsx`, err => {if(err) throw err})
    })
	})

}
