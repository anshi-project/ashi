$(document).ready(function(){

    if($("#registration-form").length) return;

    var getDates = function(){
        var dateFields ={
             passport :{
                month: $("select[name='contact[passport_expiration]'").val(),
                  day: $("input[name='passport-day']").val(),
                 year: $("input[name='passport-year']").val()
            }, 
            birthday :{
                month: $("select[name='public_data[date_of_birth]']").val(),
                day:$("input[name='birthday-day']").val(),
                year: $("input[name='birthday-year']").val()
            }
        }

        var format = function(_obj){ 
            var obj = dateFields[_obj]
            return obj.year +"-"+obj.month+"-"+obj.day 
        }
        
        var obj = {"contact[passport_expiration]" : format("passport")}

        if(location.pathname == "/admin/records/player"){
            obj["public_data[date_of_birth]"] = format("birthday")
        }
        return obj;      
    }

    function formatReqBody(form,key){
        var serializedArr = form.serializeArray();
        
        var key = key ||""
        
        var defaultForm = serializedArr.reduce((a,b)=>{
           var prop = key + b.name;

            if(b.name == "division"||b.name == "team[position]"){

                a[prop] = a[prop] || [];
                a[prop].push(b.value)
            }else{
                a[prop] = b.value;
            }
            return a
            
            },{});
        var dates = getDates();

        return Object.assign({},defaultForm,dates)
    }
    
    var initialRecords = formatReqBody($("form")); 

    (function(){
        var url = window.location.pathname;
        var exp = new RegExp("settings","i");
        var formAttr = $("form").attr("action")

        if(exp.test(url) && formAttr.match("manager") ){
            $("label[for='division']").hide();
            $(".record-checkbox").html("");
        } 
    }())// Temporary solution for hiding a label that shouldnt be rendering in Handlebars

    $(".update-main-records").on("click",function(evt){
        evt.preventDefault();
        var form = $("#records-form");
        var url = form.attr("action")
        var data = formatReqBody(form); 
        var teamUpdate = initialRecords.hasOwnProperty("team[name]")? initialRecords["team[name]"] : initialRecords.division

        if(initialRecords["team[name]"] != data["team[name]"] || initialRecords.division != data.division){
           url+= "&teamUpdate=" + teamUpdate;
        }

    
        $.ajax({
            url,
            type:"PUT",
            data,
            success: function(response){
                $("form").hide();
                $(".alert-info p").text(response)
                $(".alert-info").fadeIn("slow");
            },
<<<<<<< HEAD
            failure:function(error){
=======
            error:function(error){
>>>>>>> a46eaba833691a9b2e366223d738d5cdbdb01d77
                toastr.error(error)
            }
        })
    })    
})