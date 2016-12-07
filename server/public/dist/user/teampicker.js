function formatReqBody(serializedArr){
	return serializedArr.reduce((a,b)=>{
		a[b.name] = b.value;
		return a
		},{});
}


$('#coach-modal, #player-modal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var person = button.data('person');
      var url=button.data("url");

      $(this).find(".btn-primary").data({type:button.data("type")});
      $(this).find(".btn-primary").attr("id",url);
      $(this).find('.modal-title').text(person);
})

$(".modal .btn-primary").on("click",function(evt){
	var formData = $("form").serializeArray();
	var data = formatReqBody(formData);
	var id = $(this).attr("id")
	var url = $("form").attr("action")+id;
	var $type = $(this).data().type;
	var type = ($type=="Default"||$type=="Goalie")? "PUT" : "POST"  
	
	console.log(data, url, type)

	$.ajax({
		url,
		data,
		type,
		success:function(d){
			console.log(d);
		},
		failure:(d)=> {console.log(d)}
	})
})

$(".btn-delete").on("click",function(){
	var id=$(this).data("url");
	var msg="Are you sure you want to permanently delete this application? This can't be undone.";
	var url="/admin/assign?id="+id;
	var row = $(this).parentsUntil("tbody");
	var panel = $(this).parentsUntil(".row")
	var elem = $(".panel-default").length? panel : row;

	if(confirm(msg)){
		$.ajax({
			url,
			type:"DELETE",
			success:(d)=>{
				alert(d)
				elem.hide()
			}
		})	
	}	
})

$(".btn-delete2").on("click",function(){
	var id=$(this).data("url");
	var msg="Are you sure you to cut this player?";
	var url="/admin/archive-player?id="+id;
	var row = $(this).parentsUntil("tbody");

	if(confirm(msg)){
		$.ajax({
			url,
			type:"PUT",
			success:(d)=>{
				alert(d)
				row.hide();
			}
		})	
	}	
})

$("input[name='filter-players']").on("change",function(){
	$(".search-players").attr("list", $(this).val())
})

$(".search-players").on("input",function(){
	var mode = $(this).attr("list");
	var val = $(this).val();
	var	query = new RegExp(val, "i")

	if(val.length == 0){
		$("table tr").show()
	}else{
		$(".table tbody tr").each(function(){
			if(mode=="teams" && $(this).data("team") == val){
				$(this).show()
			}		
			else if (mode =="names" && $(this).data("person").match(query)){
				$(this).show()
			}else{
				$(this).hide()
			}
		})	
	}
})



