$(function() {
    var staff = $(".table").data("staff");

    function toggleBtn(oldStatus, newStatus) {
        var data = $(this).data();
        var parentRow = $(this).parentsUntil("tbody");

        parentRow.removeClass("row-inactive bg-warning");

        if (data.status == "Active") {
            $(this).text("Grant Credentials");
            $(this).addClass("btn-info").removeClass("btn-danger")
            data.status = "inactive";
            toastr.success("This user's credentials have been revoked.")
        
        } else {
            $(this).text("Revoke Credentials");
            $(this).addClass("btn-danger").removeClass("btn-info")
            data.status = "Active";
            toastr.success("This user has been granted working credentials and may now log in.")
        }
    } 


    $(".staff-checkbox").on("change",function(){
        var inactive = $(".row-inactive")

        if($(this).prop("checked")){
            inactive.show();
        }else{
            inactive.hide();
        }
    }) 

    $(".add-to-staff").on("click",function(){
        var id = $(this).data("user");
        $("#gm-modal .btn-success").attr("id", id);
        $("#gm-modal").modal("show");
        $(this).parentsUntil("tbody").hide()
    })

    $(".add-admin-to-staff").on("click",function(){
        var id = $(this).data("user");
        var url = "/admin/permissions?id="+id;
        var type = "PUT";
        var data = {status:"Active"};
        var row = $(this).parentsUntil("tbody")

        $.ajax({
            url,
            data,
            type,
            success:function(){
                row.fadeOut("slow")
                toastr.success("User has been added to the staff")
            },
            error:function(){
                row.hide()
                toastr.error("Something went wrong");
            }
        })
    })//TODO row should be modified with correct buttons instead of completely hidden after a successful update
    //so the user doesnt need to refresh the page

    $(".delete-record").on("click", function(){
        var id=$(this).data("url");
        var msg="Are you sure you want to permanently delete this application? This can't be undone.";
        var url="/admin/permissions?id="+id;
        var row = $(this).parentsUntil("tbody");
        
    if(confirm(msg)){
        $.ajax({
            url,
            type:"DELETE",
            success:function(response){
                toastr.success(response)
                row.hide()
            },
            error:function(err){
                toastr.error(err.responseText);
            }
        })  
    }   
    })

    $(".permission-btn").on("click", function() {
        var currStatus = $(this).data("status");
        var status = currStatus == "Active" ? "inactive" : "Active";
        var id = $(this).data("user");
        var url = "/admin/permissions?id=" + id;
        var self = this;
        var swap = toggleBtn.bind(this)
       

        $.ajax({
            url,
            type: "PUT",
            data: {status},
            success: function(){
                swap(currStatus,status);
               
            },
            error: function(){
                toastr.error("Something went wrong")
            }
        })
    })

    $("#gm-modal .btn-success").on("click", function() {
        var formData = $("form").serializeArray();
        
        var body = formData.reduce(function(prev,curr){

            curr.division = prev.division || [];
            curr.division.push(curr.value)
            return curr;
        },{})
        var id = $(this).attr("id");

        if (!body.division.length) {
            return;
        }
        $("#gm-modal").modal("hide");
        $.ajax({
            url: "/admin/assign/manager?id=" + id,
            type: "PUT",
            data: {division:body.division, status:"Active"},
            success: function(response) {
                console.log(response);
            }
        })

    })
})