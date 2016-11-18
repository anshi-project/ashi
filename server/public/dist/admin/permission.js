$(function() {
    var staff = $(".table").data("staff");

    function toggleBtn(btn) {
        var status = $(btn).data("status");
        if (status !== "Active") {
            $(btn).text("Grant");
        } else {
            $(btn).text("Revoke");
        }
    } //update the text of a button based

    function toggleRow(btn, oldStatus, newStatus) {
        var parentRow = $(btn).parentsUntil("tbody");

        parentRow.removeClass("row-" + oldStatus)
            .addClass("row-" + newStatus);

        $(btn).data({
            status: newStatus
        })

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



    $(".permission-btn").each(function() {
            var status = $(this).data("status");

            toggleBtn(this)

            if (status == "Pending" && staff == "manager") {
                $(this).data({
                    toggle: "modal"
                }).attr("href", "#gm-modal");
            }

        }) //set the text of each button on a table row

    $(".permission-btn").on("click", function() {
        var currStatus = $(this).data("status");
        var status = currStatus == "Active" ? "inactive" : "Active";
        var id = $(this).data("user");
        var url = "/admin/permissions/" + staff + "?id=" + id;
        var self = this;

        if ($(this).data().toggle) {
            $("#gm-modal .btn-success").attr("id", id);
            return $("#gm-modal").modal("show");
        }

        $.ajax({
            url,
            type: "PUT",
            data: {
                status
            },
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
        console.log(formData)
        console.log(body)
        $.ajax({
            url: "/admin/assign/manager?id=" + id,
            type: "PUT",
            data: {division:body.division},
            success: function(response) {
                alert(response);
            }
        })

    })
})