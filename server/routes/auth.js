var passport = require("passport")

module.exports=function(app){
    app.get("/login",function(req,res,next){
        var user=req.user;

        if(user){
            if(user.__t=="Admin"){
                return res.redirect("/admin/index");
            }else if(user.__t=="manager"){
                return res.redirect("/gm/index");
            }
        }else{
            res.render("login",{error:req.query.failure, success:req.query.success});
        }
    })
    
    app.post('/auth', passport.authenticate('local', 
        {successRedirect:'/auth/success',failureRedirect: '/login?failure=true'}));
    
    app.get("/auth/success",function(req,res,next){
        if(!req.user) return next();

        if(req.user.__t=="Admin"){
            return res.redirect("/admin/index")
        }else{
            return res.redirect("/gm/index")
        }
    })

    app.all("/account/*",function(req,res,next){
        if(req.user){
            return res.redirect("/")
        }else{
            next()
        }
    })

    app.all("/admin/*",function(req,res,next){
        if(!req.user || req.user.__t!="Admin") {
            return res.redirect("/login");
        }   
            return next();  
    })
    
    app.all("/gm/*",function (req,res,next) {
    	if(!req.user){
    		return res.redirect("/login");
    	}else if(req.user.__t=="Admin"){
            return res.redirect("/admin/index")
        }
        else{
    		next();
    	}
    }) 

    app.get("/logout",function(req,res){
        req.logOut();
        res.redirect("/")
    })
}