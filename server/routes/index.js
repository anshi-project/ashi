module.exports=function(app){
    app.get("/",function(req,res){
        res.render("index")
    });
    
    app.all("/login/*",function(req,res,next){
        var user=req.user;
        if(user){
            if(user.status=="Active"&& user.__t=="Admin"){
                return res.redirect("/admin/index");
            }else if(user.status=="Active"&& user.__t==""){
                return res.redirect("/gm/index");
            }
        }else{
            return next();
        }
    })
 
    app.all("/admin/*",function(req,res,next){
        if(!req.user ||  req.user.status!="Active" || req.user.__t!="Admin") {
            return res.redirect("/login/admin");
        }   
            return next();  
    })
    
    app.all("/gm/*",function (req,res,next) {
    	if(!req.user || req.user.status!=="Active"){
    		return res.redirect("/login/gm");
    	}else{
    		next();
    	}
    }) 

       
}

 