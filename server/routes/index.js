module.exports=function(app){
    app.get("/",function(req,res){
        res.render("index")
    });
    

    app.get("/login",function(req,res,next){
        var user=req.user;
        console.log(user);
        if(user){
            if(user.__t=="Admin"){
                return res.redirect("/admin/index");
            }else if(user.__t=="manager"){
                return res.redirect("/gm/index");
            }
        }else{
            res.render("login");
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

    app.get("/user",function(req,res){
        var record=require("../locals/googleSpreadsheet");
        var Player=require("../models/registration/_playerReg");
        Player.findOne({},function(e,doc){
            record("player",doc,function(e,d){
                res.send(d);    
            })
            
        })

    })
}

 