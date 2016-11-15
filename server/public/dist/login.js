$(".login-form input[type='radio']").on("change",function(){
	var type = $(this).val()
	$(".login-form").attr("action",`/login/${type}`);
})
