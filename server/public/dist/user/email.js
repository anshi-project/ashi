$(function(){
	var recipients = $("#recipients");
	var	cc = $("#cc")
	var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var regexp = new RegExp(reg);

	function getRecipients(){
		var players = [];
		var _cc = $(".team-table-active .email-cc").text().split(", ")
		
		$(".team-table-active tbody tr").each(function(){
			if($(this).children("td.email-cell").length){
				players.push($(this).children("td.email-cell").text().trim());
			}else if($(this).children("td.coach-email-cell")){
				_cc.push($(this).children("td.coach-email-cell").text().trim());
			}
		})
		recipients.val(players.join(", "))
		cc.val(_cc.join(", "))
	}

	function formattedMessage(){
		var msgBody = $("#message-text").val().split("\n")
		var formattedString = "";

		msgBody.forEach(line =>{
			var newLine = "<p>\t"+ line.trim() +"</p>"
			formattedString += newLine; 
		})
		return formattedString;
	}

	function validate(){
		var emails = recipients.val()+", "+cc.val();
		var arr = emails.split(",")
	
		for(var i = 0; i < arr.length; i++){
			
			arr[i] = arr[i].trim();
			
			if(!regexp.test(arr[i])){
			 $(".email-error").show();
			 return false;
			}else{
				arr[i] = "<"+arr[i]+">";
			}
		}
		return arr.join(",");
	} // validate emails are properly formatted. If valid add further formatting  for nodemailer

	$(".email-btn").on("click", getRecipients);

	$(".send-email-btn").on("click",function(){
		var url = "/message";
		var recipients = validate();
		var message = formattedMessage();
		var subject = $("#subject").val() || "No Subject";
		
		var data = {recipients, message, subject}

		if(!recipients) return;

		$(".modal").modal("toggle");

		$.ajax({
			url,
			type:"POST",
			data,
			success: function(response){
				alert("Messages successfully delivered")
				$("#message-text, #subject").val("")
			},
			failure:function(msg){
				alert("Your emails were not delivered. Please try again")
			}
		})// TODO replace alert message with something more seamless
	})

	$("button.email-reg-form").on("click",function(){
		var type = $(this).data("stafftype");
		var email = $("input[type='email']").val();
		if(!reg.test(email)) return;

		$.ajax({
			url:"/admin/permissions/"+type,
			type:"POST",
			data:{email},
			success: response=>{
				$("#permission-well").collapse("hide")
			},
			failure: err => {
				console.log(err)
			}
		})
	})
})	