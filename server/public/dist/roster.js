$(document).ready(function(){
	var tables=$(".team-table")
	
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

	$(".team-name").on("change",function(){
		$(".team-table-active").removeClass("team-table-active")
			render();
	})
});



