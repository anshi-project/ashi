var StaffMember = require("../../models/staff/main");
var divisions = require("../../locals/fields/teams").divisions

module.exports = function(app){

  app.get("/admin/staff/:type",function(req,res,next){
    var type = req.params.type;
    var $regex = new RegExp(type,"i")    
    var query = {username:{$ne:req.user.username},__t:{$regex}, status:{$ne:"registration form delivered"}}
    
    if(!/\badmin\b|\bmanager\b|\bcoach\b/i.test(type)) return next({status:404})

    StaffMember.find(query)
      .sort({"status":1,"lastname":1})
      .exec(function(err,user){
    
        if(err) return next({status:503,msg:"There was a database error, please try again shortly."})
        
        res.render("admin/permissions/"+type,
          {user,staffType:type, userType:"admin",layout:"user",divisions})
    })
  })

  app.post("/admin/permissions/:type",function(req,res){
    var email = req.body.email;
    var type = req.params.type;
    var url = req.protocol + '://' + req.get('host');
    var mailRegForm = require("../../config/addStaff");

    mailRegForm(type, email, url, function(err, info){
      if(err) return res.status(500).send(err)
        res.status(200).send(info)
    })
  })//send a registration form to admin or GM to fill out with token that expires in one week.

  app.put("/admin/permissions",function(req,res){
    var id = req.query.id;
    
    StaffMember.findByIdAndUpdate(id,{"status":req.body.status})  
      .exec(function(e,d){
        if(e) return res.status(500).send("Error Updating the database")
        res.send("Updated user:"+id);
    })
  })//grant or revoke permissions will remove staff from team/divisions and remove login credentials

  app.delete("/admin/permissions",function(req,res){
    var id = req.query.id;

    StaffMember.findByIdAndRemove(id).exec(err=>{if(err)throw new Error("db delete error")})
      .then(() => {res.send("Successfully deleted user's application")})
      .catch(err => {res.send("Something went wrong while trying to delete this application")})
  })
}