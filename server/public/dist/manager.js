var tables=$(".team-table")

$(tables[0]).addClass("team-table-active");
$(".team-roster-display").text($("select option:selected").text())

$(".team-name").on("change",function(){
	
	var index=$(this).val();
	var text=$(this).text();

	$(".team-roster-display").text($("select option:selected").text())
	$(".team-table-active").removeClass("team-table-active")
	$(tables[index]).addClass("team-table-active");
})

console.log("loading..")