$(document).ready(function(){
    function formatReqBody(form,key){
        var serializedArr = form.serializeArray();
        var key = key ||""
        return serializedArr.reduce((a,b)=>{
           var prop = key + b.name;
            if(b.name == "division"){
                a[prop] = a[prop] || [];
                a[prop].push(b.value)
            }else{
                a[prop] = b.value;
            }
            return a
            
            },{});
    }
    
    var initialRecords = formatReqBody($("form")); 

    $(".update-main-records").on("click",function(evt){
        evt.preventDefault();
        var form = $(".main-records");
        var url = form.attr("action")
        var data = formatReqBody(form); 
        var teamUpdate = initialRecords.hasOwnProperty("team[name]")? initialRecords["team[name]"] : initialRecords.division

        if(initialRecords["team[name]"] != data["team[name]"] || initialRecords.division != data.division){
           url+= "&teamUpdate=" + teamUpdate;
           console.log(url)
        }


        $.ajax({
            url,
            type:"PUT",
            data,
            success: d=>{console.log(d)}
        })
    })    
})