var StaffMember = require("../../models/staff/main");
var divisions = require("../../locals/fields/teams").divisions

module.exports = function(app){

  app.get("/admin/permissions/:type",function(req,res){
    var type = req.params.type;
    var $regex = new RegExp(type,"i")    
    
    StaffMember.find({username:{$ne:req.user.username},__t:{$regex}})
      .sort({"status":1,"lastname":1})
      .exec(function(e,user){
        res.render("admin/permissions/"+type,{user, layout:"spreadsheet",divisions})
    })
  })

  app.put("/admin/permissions/:type",function(req,res){
    var id = req.query.id;
    
    StaffMember.findByIdAndUpdate(id,{"status":req.body.status})  
      .exec(function(e,d){
        res.send("Updated user:"+id);
    })
  })
}