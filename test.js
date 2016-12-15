$.ajax({
	url:"https://ashi-hockey.herokuapp.com/api/team?name=U16",
	type:"GET",
	success:(data) =>{
	console.log(data)
	}

})