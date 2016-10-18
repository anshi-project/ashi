/*global $*/

var adjustForLeapYear=function(_date){
    var date=_date.split("-");
    if(date[1]=='02'&&date[2]=="29"){
        date[2]="28";
    }
    return  date.join("-");
}

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}//http://stackoverflow.com/questions/4060004/calculate-age-in-javascript

function toggleFormField(element,condition){
    if(condition){
        element.attr("required",false).attr("disabled",true).parent().css("opacity",".8");
    }else{
        element.attr("required",true).attr("disabled",false).parent().css("opacity","1");
    }
}


$("input[name='passport']").on("change",function(){
    var passport=$("input[name='passport']:checked").val();
    var expDate=$("input[name='passport_expiration']")
    var condition=(passport=="no");
    toggleFormField(expDate,condition);
})

$("input[name='date_of_birth']").on("change",function(){
    var bday=adjustForLeapYear($(this).val());
    var age=_calculateAge(new Date(bday));
    var guardian=$("input[name='guardian_name']");
    var guardianPhone=$("input[name='guardian_phone']");
    var condition=(age>=18 && age<100);
    
    toggleFormField(guardian,condition);
    toggleFormField(guardianPhone,condition);
})

$(".reg-submit-manager").on("click",function(evt){
    var pw=$("input[name='password']").val();
    var pwConfirm=$("input[name='password-confirm']").val()
    
    if(pw!=pwConfirm||pw.length<6){
        evt.preventDefault()
        alert("Passwords must match and be greater than 6 characters in length.")
    }
})

$("input[name='preferred_coaching_positions']").on("change",function(){
    if($(this).val()=="Other"){
        var newPosition=prompt("Please specify the name of the position you are seeking.");
        $(this).val("__other: "+newPosition);
        $(".other-opt").text(newPosition);
    }
})

$("#registration-form").on("submit",function(e){
    var dataArr=$("#registration-form").serializeArray();
    var data={};
    var loc=window.location;

    dataArr.forEach(v=> data[v.name]=v.value||"N/A");
    
    localStorage.setItem(formURL, JSON.stringify(data));
})


    var formURL=window.location.pathname+window.location.search.replace("?part=1","");
    var formData=JSON.parse(localStorage.getItem(formURL))||{};
    var props=Object.keys(formData)
    
    props.forEach(function(prop){
        let val=formData[prop]
        $(`input:not(:radio)[name=${prop}]`).attr("value",val);
        $(`select[name=${prop}]`).val(val);
        
        // if(prop!="height") $(`input:radio[name=${prop}][value=${val}]`).prop("checked",true)
        
    })


