$(function(){
	var recipients = $("#recipients");
	var	cc = $("#cc")
	var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var regexp = new RegExp(reg);

	var tryoutEmails = {};

	(function(){
		if(location.pathname !== "/admin/assign/player") return;

		$("table tbody tr").each(function(){
			var team = $(this).data("team");
			var email = $(this).data("email");

			tryoutEmails[team] = tryoutEmails[team] || [];
			tryoutEmails[team].push(email)

			if(team.match(/U16|U18|U20/)){
				tryoutEmails["Junior's"] = tryoutEmails["Junior's"] || [];
				tryoutEmails["Junior's"].push(email)
			}
		})
	}())
	//IIFE that formats an object of email addresses for players trying out.
	//TODO make a more universal function than the one below

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
	}//this function is used only on the roster page
	

	function formattedMessage(){
		var msgBody = $("#message-text").val().split("\n")
		var formattedString = "";

		if(!msgBody.length || $("#message-text").val().trim().length == ""){
			$(".msg-error").show();
			return false;
		}

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

	$("#email-modal").on("show.bs.modal", function(event){
		if(location.pathname !== "/admin/assign/player") return;

		var href = $(event.relatedTarget)
		var teamName = href.data("teamname")
		$("#email-modal .modal-title").text(teamName)
		recipients.val(tryoutEmails[teamName])
	})




	$(".send-email-btn").on("click",function(){
		var url = "/message";
		var recipients = validate();
		var message = formattedMessage();
		var subject = $("#subject").val() || "No Subject";
		
		var data = {recipients, message, subject}

		if(!recipients || !message ) return;


		$(".modal").modal("hide");

		$.ajax({
			url,
			type:"POST",
			data,
			success: function(response){
				toastr.success("Messages successfully delivered")
				$("#message-text, #subject").val("")
			},
			failure:function(msg){
				toastr.error("Your emails were not delivered. Please try again")
			}
		})
	})

	$("button.email-reg-form").on("click",function(){
		var type = $(this).data("stafftype");
		var email = $("input[type='email']").val();
		
		if(!reg.test(email)) return;

		$("#permission-well").collapse("hide")

		$.ajax({
			url:"/admin/permissions/"+type,
			type:"POST",
			data:{email},
			success: response=>{
				toastr.success("An application form was successfully delivered to " + email)
				$("input[type='email']").val("");
			},
			failure: err => {
				toastr.error(err)
			}
		})
	})
})	