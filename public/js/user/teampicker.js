
(function(){

var searchMode = "name";
toastr.options.closeButton = true;
toastr.options.closeDuration = 60;
toastr.options.closeEasing = 'swing';
toastr.options.showMethod = 'slideDown';

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

$("#coach-modal .btn-primary, #player-modal .btn-primary").on("click",function(evt){
	var formData = $("form").serializeArray();
	var data = formatReqBody(formData);
	var id = $(this).attr("id")
	var person = $("#player-modal .modal-title, #coach-modal .modal-title").text()
	var url = $("form").attr("action")+id;
	var $type = $(this).data().type;
	var type = ($type== "returning player")? "PUT" : "POST"  

	var breakAt = location.pathname.match("/admin/assign/player") ? "tbody" : ".row"; 
	var elem = $("button[data-url='"+id+"']").parentsUntil(breakAt)
	
	if(!data.name || data.hasOwnProperty("role")&& !data.role) return;

	$.ajax({
		url,
		data,
		type,
		success:function(d){
			elem.hide();
			toastr.success(person + " has been successfully added to the "+data.name+" roster." )
		},
		error:function(d){
			toastr.error(d.responseText)	
		}
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
			success:(response)=>{
				toastr.success(response)
				elem.hide()
			},
			error:function(d){
				toastr.error(d.responseText)	
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
			success:function(d){
				toastr.success(d);
				row.hide();
			}
		})	
	}	
})

$("input[name='filter-players']").on("change",function(){
	$(".search-players").attr("list", $(this).val())
	searchMode = $(this).val();
})

$(".search-players").on("input",function(){
	var val = $(this).val();
	var	query = new RegExp(val, "i")

	if(val.length == 0){
		$("table tr").show()
	}else{
		$(".table tbody tr").each(function(){


			if(searchMode == "teams" && $(this).data("team") == val){
				$(this).show()
			}		
			else if (searchMode =="name" && query.test($(this).data("person"))){
				$(this).show()
			}else{
				$(this).hide()
			}
		})	
	}
})

}())
