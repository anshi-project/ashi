exports.googleSpreadsheet=function(data){
return {"Time Stamp":data["updatedAt"],
 "First Name":data["firstname"],
 "Last Name":data["lastname"],
 "Email":data["contact"]["email"],
 "Alt Email":data["contact"]["alt_email"],
 "Phone":data["contact"]["phone1"],
 "Alt Phone":data["contact"]["phone2"],
 "Passport":data["contact"]["passport"],
 "Passport Exp":data["contact"]["passport_expiration"],
 "Shirt size":data["apparel"]["shirt"],
 "Jacket size":data["apparel"]["jacket"],
 "Hat size":data["apparel"]["hat"],
 "Polo size":data["apparel"]["polo"],
 "division":data["division"],
 "username":data["username"]
}
}