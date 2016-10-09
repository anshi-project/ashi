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

var states=["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
          "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", 
          "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", 
          "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", 
          "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

var heights=["4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"",
                "5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"",
                "6'1\"","6'2\"","6'3\"","6'4\"","6'5\"","6'6\"","6'7\"","6'8\"",
                "6'9\"","6'10\"","6'11\"","7'0\""];          

exports.formFields={states:states,heights:heights};

var randomNum=function(start,end){
    return Math.floor(Math.random()*(start-end)+start)
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