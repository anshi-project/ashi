var randomNum=function(start,end){
    return Math.floor(Math.random()*(end)+start)
}

var randomJerseyNumbers=function(){
    return [randomNum(0,33),randomNum(33,66),randomNum(66,100)]
}



exports.players=[
    {public_data:{lastname:"Cave",firstname:"Colby",email:"ardf@a"},hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Bergeron",firstname:"Patrice",email:"bf@a"},hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Bonino",firstname:"Nick",email:"s@fs"},hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Ferlin",firstname:"Brian",email:"fdffdsf@fvxc"},hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Smith",firstname:"Steve",email:"agrdfbv@a"},hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Williams",firstname:"Evan",email:"bgfgbg@a"},hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Beam",firstname:"Jim",email:"s@gfhfgs"},hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Daniels",firstname:"Jack",email:"fdfgghffdsf@fvxc"},hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Waters",firstname:"Roger",email:"ardfbv@a"},hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Mason",firstname:"Nick",email:"bfgbg@a"},hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Wright",firstname:"Richard",email:"s@gfhfs"},hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {public_data:{lastname:"Gilmour",firstname:"David",email:"fdfghffdsf@fvxc"},hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()}    
]

exports.teams=[
    {division:"Junior's",name:"U16"},    
    {division:"Junior's",name:"U18"}, 
    {division:"Junior's",name:"U20"}, 
    {division:"Men's",name:"Team USA"}, 
    {division:"Women's",name:"Team USA"}, 
    {division:"Men's Master's",name:"Men's Team USA"}, 
    {division:"Men's Master's",name:"Men's Team DC"}, 
    {division:"Women's Master's",name:"Women's Team Red"},
    {division:"Women's Master's",name:"Women's Team Blue"}
]