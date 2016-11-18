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
    var prevTeamRecords = formatReqBody($(".team-records"),"prev-"); 

    $(".update-main-records").on("click",function(evt){
        evt.preventDefault();
        var form = $(".main-records");
        var url = form.attr("action")
        var data = formatReqBody(form); 
        $.ajax({
            url,
            type:"PUT",
            data,
            success: d=>{console.log(d)}
        })
    })    

    $(".record-update").on("click",function(evt){
        evt.preventDefault();
        var type= $(this).data("type");
        var id= $(this).data("id")
        var url ="/admin/update/team-records/"+type+"?id="+id;
        var currTeamRecords = formatReqBody($(".team-records"));
        var data = Object.assign({}, prevTeamRecords,currTeamRecords)

        $.ajax({
            url,
            type:"PUT",
            data,
            success: d=>{console.log(d)}
        })
    })
})