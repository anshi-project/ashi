$(".player-payment-search-input").on("input",function(e){
	var inputVal = new RegExp($(this).val(), "i" );

	if($(this).val().trim().length == 0){
		$(".payment-radio").show();
		$("#radio-all").prop("checked",true);
	}else{
		$(".payment-radio").hide()
	}

	$(".payment-row").each(function(){
		var player = $(this).data("player");

		if(player.match(inputVal)){
			$(this).show();
		}else{
			$(this).hide();
		}
	})
})

$("input[name='paid-filter']").on("change",function(){
	var row = $(this).val();
	$(".payment-row").show()
	
	if(row != ".payment-row"){
		$(`.payment-row:not(${row})`).hide();
	}
})//Filter by payment status

function updateRow(){
	var flag = $(this).hasClass("payment-true");
	var a = flag? "payment-false" : "payment-true";
	var b = flag? "payment-true" : "payment-false";

	$(this).addClass(a).removeClass(b);
	$(this).css("background","pink")
}

$(".payment-btn").on("click",function(){
	var paidStatus = $(this).data("paid");
	var id = $(this).data("id");
	var row = $(this).parent().parent();



	$.ajax({
		url:`/admin/payments/${id}`,
		type:"PUT",
		data:{paid: !paidStatus},
		success: updateRow.bind(row),
		failure:e=>{console.log(e)}
	})
})