var StaffMember = require("../../models/staff/main");
var divisions = require("../../locals/fields/teams").divisions

module.exports = function(app){

  app.get("/admin/staff/:type",function(req,res){
    var type = req.params.type;
    var $regex = new RegExp(type,"i")    
    var query = {username:{$ne:req.user.username},__t:{$regex}, status:{$ne:"registration form delivered"}}

    StaffMember.find(query)
      .sort({"status":1,"lastname":1})
      .exec(function(e,user){
        res.render("admin/permissions/"+type,
          {user,staffType:type, userType:"admin",layout:"user",divisions})
    })
  })

  app.post("/admin/permissions/:type",function(req,res){
    var email = req.body.email;
    var type = req.params.type;
    var url = req.protocol + '://' + req.get('host');
    var mailRegForm = require("../../config/addStaff");

    mailRegForm(type, email, url, function(err,info){
      if(err) res.send(err).status(500)
        res.send(info).status(200)
    })
  })//send a registration form to admin or GM to fill out with token that expires in one week.

  app.put("/admin/permissions/:type",function(req,res){
    var id = req.query.id;
    
    StaffMember.findByIdAndUpdate(id,{"status":req.body.status})  
      .exec(function(e,d){
        res.send("Updated user:"+id);
    })
  })//grant or revoke permissions will remove staff from team/divisions and remove login credentials
}