var Admin=require("../../models/staff/admin");

module.exports=function(app){
	app.get("/create-admin",function(req,res){
    res.render("admin/create_new/form");
  })

  app.post("/create-admin",function(req,res){
     var fields=["firstname","lastname","username","password"];
     var fields2=["phone1","phone2","email","alt_email"];
     var admin={contact:{}};

     fields.forEach(v=> admin[v]=req.body[v]);
     fields2.forEach(x=> admin.contact[x]=req.body[x]||"N/A");

     Admin.create(admin,function(e,d){
        res.send(d);
     })
  })

  app.get("/admin/grant-access",function(req,res){
    Admin.find({status:"pending"},function(e,d){
      res.render("admin/create_new/grant_access",{admin:d})
    })
  })

  app.put("/admin/grant-access/:id",function(req,res){
    var id=req.params.id;
    Admin.findByIdAndUpdate(id,{"status":"admin"},function(e,d){
      res.send("Access Granted")
    })
  })
}