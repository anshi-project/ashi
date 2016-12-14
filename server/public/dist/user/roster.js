$(document).ready(function(){
	var tables = $(".team-table");
	var UpdatedPlayers = {}
	var EditMode = false;
	var SaveBtn = `<span class='glyphicon glyphicon-floppy-disk'></span>Save`
    var EditBtn = $(".edit-roster-btn").html();
    var stateTracker;
    var exportTeamHREF = $("#export-team").attr("href");
    var exportDivHREF = $("#export-division").attr("href");
	


	function render(){
		var title=$("select option:selected").text();
		
		window.location.hash = title;

		$.each(tables,function(){
			if($(this).data("teamname") == title){
			   $(this).addClass("team-table-active")	   
			}
		})
		var team = $(".team-table-active").data("teamname");
		var division = $(".team-table-active").data("division"); 
		
		$(".team-roster-display").text(title);
		$("#export-team").attr("href", exportTeamHREF+"?q=" + team);
		$("#export-division").attr("href", exportDivHREF+"?q="+division);
	}


	
	function updateView(){
		if(EditMode){
			saveUpdate();
		 	$(".team-name").prop("disabled",false);
		 	$(".team-name").css("opacity","1");
		 	$(".roster-checkbox").hide();
			$(".td-checkbox span").show();
			$(".edit-roster-btn").html(EditBtn);
			$(".cancel-edit-btn").hide();			
		}else{
			stateTracker = getTableState();
		 	$(".team-name").prop("disabled",true)
		 	$(".team-name").css("opacity","0.4");
		 	$(".roster-checkbox").show();
		 	$(".td-checkbox span").hide();
		 	$(".cancel-edit-btn").show();
		 	$(".edit-roster-btn").html(SaveBtn);
		}
		$(".edit-roster-btn").toggleClass("btn-primary").toggleClass("btn-warning");
		EditMode = !EditMode;
	}

	function getTableState(){
		var a = {};//initial state
		var b = {};//curr state
		
		$(".team-table-active").find(".td-checkbox").each(function(){
			var id = $(this).data("id");
			var field = $(this).data("field")
			var flag = $(this).children("input").is(":checked");

			a[id] = a[id] || {};
			b[id] = b[id] || {};
			b[id][field] = flag;
			a[id][field] = flag;
		})
		return function(id, col){
			if(arguments.length == 2){
				b[id][col] = !b[id][col];
			}else if(arguments.length == 1){
				b = {};
			}else{
				return b;
			} 
		} 
	}

	function resetCells(){
		$(".team-table-active").find(".td-checkbox").each(function(){
			var flag = $(this).children("span").hasClass("glyphicon-check")
			$(this).children("input").prop("checked", flag);
		})
		stateTracker("reset");
		updateView();
	}
	

	function updateCells(){
		$(".team-table-active").find(".td-checkbox").each(function(){
			var input = $(this).children("input");
			var span = $(this).children("span"); 
			
			if(input.is(":checked") && span.hasClass("glyphicon-remove")){
				span.addClass("glyphicon-check").removeClass("glyphicon-remove")
			}else if(!input.is(":checked") && span.hasClass("glyphicon-check")){
				span.removeClass("glyphicon-check").addClass("glyphicon-remove")
			}
		})
	}

	function saveUpdate(){
		var data = stateTracker();
		var userType = $(".edit-roster-btn").data("user");
		var url = "/"+userType+"/roster";
		var type = "PUT";

		
		if (jQuery.isEmptyObject(data)) return
	    
		$.ajax({
			url, 
			type, 
			data, 
			success:updateCells,
			failure:d=>{toastr.error(d)}
		})
	}

	$(".team-name").on("change",function(){
		$(".team-table-active").removeClass("team-table-active");
		render();
	})

	$(".cancel-edit-btn").on("click",resetCells)
	$(".edit-roster-btn").on("click", updateView);
	
	$(".td-checkbox input").on("change",function(){
		var parent = $(this).parent();
		var id = parent.data("id");
		var field = parent.data("field");

		stateTracker(id, field);
	})

	if(window.location.hash){
		$("select option").each(function(){
			var option = $(this).text();			
			if(window.location.hash.substr(1) == option){
				return $(this).attr("selected",true)
			}
		})		
	}
	//initialize by inspection hash onload and updating team selected in the dropdown.
	render();
	//if none selected - render first team listed in the dropdown
});





