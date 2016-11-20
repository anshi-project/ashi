var common = require("./common")
var divisions = require("./teams").divisions

module.exports = [
    common.firstname,
    common.lastname,
    {label:"Division",
     name:"division",
     checkbox:divisions,
     recordOnly:true
    },    
    common.passport,    
    common.passport_exp,
    common.email,
    common.alt_email,
    common.phone1,
    common.phone2,
    common.shirt,
    common.polo,
    common.jacket,
    common.hat,
    common.username,
    common.password,
    common.confirmPW
]
