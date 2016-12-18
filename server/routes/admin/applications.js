var renderCompletedForm = require("../../locals/registration").renderCompletedForm;
var writeCSV = require("../../locals/registration").writeCSV;

module.exports=function(app){

  app.get("/admin/applications/:type/view",function(req,res,next){
    var id = req.query.id;
    var type = req.params.type;

    renderCompletedForm(type,id,function(err,data){
      if(err) return next({status:500,msg:err});
      res.send(data);
    })
  })

	app.get("/admin/applications/:type",function(req,res){
    var type=req.params.type
    writeCSV(type, function(err,file){
      if(err) return next(err);
      res.download( file,`${type} Applications.xlsx`, err => {if(err) return next({status:500, msg:"Error processing download."})})
    })
	})
}
