exports.getType=function(_type){
	var type={}

	switch(_type){
		case "player":
			type.registration="./_playerReg";
			type.schema="../players/main";
			type.discriminator="./_default"
			type.category="players"
			break;
		case "goalie":
			type.registration="./_playerReg";
			type.schema="../players/main";
			type.discriminator="./_goalie";
			type.category="goalies";
			break;
		case "coach":
			type.registration="./_coachReg";
			type.schema="../staff/coach";
			type.discriminator=null;
			type.category="coaches";
			break;
		case "manager":
			type.registration="./_managerReg";
			type.schema="../staff/manager";
			type.discriminator=null;
			type.category="managers";
			break;
		default:
			type.error="Unrecognized parameter";					
	}
	return type;
}