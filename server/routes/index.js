module.exports=function(app){
    app.get("/",function(req,res){
        res.render("index")
    });
    
    app.all("/login/*",function(req,res,next){
        if(req.user){
            var status=req.user.status;
            if(status=="admin"){
                return res.redirect("/admin/index");
            }else{
                return res.redirect("/gm/index");
            }
        }else{
            return next();
        }
    })
 
    app.all("/admin/*",function(req,res,next){
        if(!req.user || req.user.status!="admin") {
            return res.redirect("/login/admin");
        }   
            return next();  
    })
    
    app.all("/gm/*",function (req,res,next) {
    	if(!req.user){
    		return res.redirect("/login/gm");
    	}else{
    		next();
    	}
    }) 

       
}

 