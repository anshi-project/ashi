$(function() {
    var staff = $(".table").data("staff");

    function toggleBtn(btn) {
        var status = $(btn).data("status");
        if (status !== "Active") {
            $(btn).text("Grant").addClass("btn-info");
        } else {
            $(btn).text("Revoke");
        }
    } //update the text of a button based

    function toggleRow(btn, oldStatus, newStatus) {
        var parentRow = $(btn).parentsUntil("tbody");

        parentRow.removeClass("row-" + oldStatus).addClass("row-" + newStatus);

        $(btn).data({status: newStatus})
        
        toggleBtn(btn);
    } //Updates the appearance of a table row to reflect a change in status

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
        
    })

    $(".permission-btn").on("click", function() {
        var currStatus = $(this).data("status");
        var status = currStatus == "Active" ? "inactive" : "Active";
        var id = $(this).data("user");
        var url = "/admin/permissions/" + staff + "?id=" + id;
        var self = this;

        $.ajax({
            url,
            type: "PUT",
            data: {status},
            success: toggleRow(self, currStatus, status)
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
            return alert("no")
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