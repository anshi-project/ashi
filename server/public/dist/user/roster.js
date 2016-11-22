$(document).ready(function(){
	var tables = $(".team-table");
	var UpdatedPlayers = {}
	var EditMode = false;
	var SaveBtn = `<span class='glyphicon glyphicon-floppy-disk'></span>Save`
    var EditBtn = $(".edit-roster-btn").html();
    var stateTracker;
    var currState;

	function render(){
		var title=$("select option:selected").text();
		$(".team-roster-display").text(title)

		$.each(tables,function(t){
			if($(this).data("teamname")==title){
			   $(this).addClass("team-table-active")
 			   
			}
		})
	}
	render();


	function getTableState(){
		var initialState = {};
		var modifications = {}
		
		$(".team-table-active").find(".td-checkbox").each(function(){
			var id = $(this).data("id");
			var field = $(this).data("field")
			var flag = $(this).children("input").is(":checked");

			initialState[id] = initialState[id] || {};
			modifications[id] = modifications[id] || {};
			initialState[id][field] = flag;
			modifications[id][field] = flag;
		})	//The only way I could think of to create two unique object with embedded objects as values
			//that were initially identical, was to manually assign them both within this loop
			//Object.assign would result in the nested properties being a reference to the original object
					
		
		

		return function(id, col){
			if(arguments.length == 2){
				modifications[id][col] = !modifications[id][col];
				console.log(initialState[id],modifications[id])
			}else if(arguments.length == 1){
				return initialState;
			}else{
				var keys = Object.keys(modifications);
				var obj = {}
				keys.forEach(key =>{
					
					if(modifications[key]["paid"] != initialState[key]["paid"] || 
						modifications[key]["headshot"] != initialState[key]["headshot"]){
						obj[key] = modifications[key];
					}
				})
				return obj;
			} 
		} 

	}

	function saveUpdate(){
		var data = stateTracker();
		console.log(data);
	}

	$(".team-name").on("change",function(){
		$(".team-table-active").removeClass("team-table-active")
			render();
	})

	$(".email-btn").on("click",function(){

		var emails = $(".team-table-active .player-email").text().trim();
		$("#recipient-name").val(emails);
	})

	$(".send-email-btn").on("click",function(){
		var url = "/message"
		// var recipients = $("#recipient-name").val();
		var message = $("#message-text").val() ;
		var subject = $("#subject").val() || "No Subject";
		var data = {recipients: "adamhs3521@gmail.com michael@freecodecamp.com ms-ams@outlook.com jasonrfcc@gmail.com"
			, message, subject}

		$.ajax({
			url,
			type:"POST",
			data,
			success: res => {console.log(res); $(".modal").modal("toggle");}
		})
	})

	$(".edit-roster-btn").on("click",function(){
		 if(EditMode){
		 	saveUpdate();
		 	$(".roster-checkbox").hide();
		 	$(".td-checkbox span").show();
		 	$(this).html(EditBtn);
		 }else{
		 	stateTracker = getTableState();
		 	$(".roster-checkbox").show();
		 	$(".td-checkbox span").hide();
		 	$(this).html(SaveBtn);
		 }
		 $(this).toggleClass("btn-primary").toggleClass("btn-warning");
		EditMode = !EditMode;
		$(".team-name").attr("disabled", EditMode);

	})
	
	$(".td-checkbox input").on("change",function(){
		var parent = $(this).parent();
		var id = parent.data("id");
		var field = parent.data("field");
		stateTracker(id, field)
	})

});



