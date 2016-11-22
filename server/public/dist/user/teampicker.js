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
		
	$.ajax({
		url,
		data,
		type,
		success:function(d){
			console.log(d);
		}
	})
})

$(".btn-danger").on("click",function(){
	var id=$(this).data("url");
	var msg="Are you sure you want to permanently delete this application? This can't be undone.";
	var url="/admin/assign?id="+id;

	if(confirm(msg)){
		$.ajax({
			url,
			type:"DELETE",
			success:(d)=>{console.log(d)}
		})	
	}	
})

