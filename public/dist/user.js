!function(t){function e(s){if(a[s])return a[s].exports;var i=a[s]={exports:{},id:s,loaded:!1};return t[s].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){"use strict";a(1),a(2),a(3),a(4),a(5)},function(t,e){"use strict";$(function(){function t(){var t=[],e=$(".team-table-active .email-cc").text().split(", ");$(".team-table-active tbody tr").each(function(){$(this).children("td.email-cell").length?t.push($(this).children("td.email-cell").text().trim()):$(this).children("td.coach-email-cell")&&e.push($(this).children("td.coach-email-cell").text().trim())}),s.val(t.join(", ")),i.val(e.join(", "))}function e(){var t=$("#message-text").val().split("\n"),e="";return t.length&&""!=$("#message-text").val().trim().length?(t.forEach(function(t){var a="<p>\t"+t.trim()+"</p>";e+=a}),e):($(".msg-error").show(),!1)}function a(){for(var t=i.val().length?s.val()+", "+i.val():s.val(),e=t.split(","),a=0;a<e.length;a++){if(e[a]=e[a].trim(),!o.test(e[a]))return $(".email-error").show(),!1;e[a]="<"+e[a]+">"}return e.join(",")}var s=$("#recipients"),i=$("#cc"),n=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,o=new RegExp(n),r={All:[]};!function(){"/admin/assign/player"===location.pathname&&$(".teampicker-table tbody tr").each(function(){var t=$(this).data("team"),e=$(this).data("email");r.All.push(e),r[t]=r[t]||[],r[t].push(e),t.match(/U16|U18|U20/)&&(r["Junior's"]=r["Junior's"]||[],r["Junior's"].push(e))})}(),$(".email-btn").on("click",t),$("#email-modal").on("show.bs.modal",function(t){if("/admin/assign/player"===location.pathname){var e=$(t.relatedTarget),a=e.data("teamname");$("#email-modal .modal-title").text(a),s.val(r[a])}}),$(".send-email-btn").on("click",function(){var t="/message",s=a(),i=e(),n=$("#subject").val()||"No Subject",o={recipients:s,message:i,subject:n};s&&i&&($(".modal").modal("hide"),$.ajax({url:t,type:"POST",data:o,success:function(t){toastr.success("Messages successfully delivered"),$("#message-text, #subject").val("")},failure:function(t){toastr.error("Your emails were not delivered. Please try again")}}))}),$("button.email-reg-form").on("click",function(){var t=$(this).data("stafftype"),e=$("input[type='email']").val();n.test(e)&&($("#permission-well").collapse("hide"),$.ajax({url:"/admin/permissions/"+t,type:"POST",data:{email:e},success:function(t){toastr.success("An application form was successfully delivered to "+e),$("input[type='email']").val("")},failure:function(t){toastr.error(t)}}))})})},function(t,e){"use strict";$(function(){function t(t,e){var a=$(this).data(),s=$(this).parentsUntil("tbody");s.removeClass("row-inactive bg-warning"),"Active"==a.status?($(this).text("Grant Credentials"),$(this).addClass("btn-info").removeClass("btn-danger"),a.status="inactive",toastr.success("This user's credentials have been revoked.")):($(this).text("Revoke Credentials"),$(this).addClass("btn-danger").removeClass("btn-info"),a.status="Active",toastr.success("This user has been granted working credentials and may now log in."))}$(".table").data("staff");$(".staff-checkbox").on("change",function(){var t=$(".row-inactive");$(this).prop("checked")?t.show():t.hide()}),$(".add-to-staff").on("click",function(){var t=$(this).data("user");$("#gm-modal .btn-success").attr("id",t),$("#gm-modal").modal("show"),$(this).parentsUntil("tbody").hide()}),$(".add-admin-to-staff").on("click",function(){var t=$(this).data("user"),e="/admin/permissions?id="+t,a="PUT",s={status:"Active"},i=$(this).parentsUntil("tbody");$.ajax({url:e,data:s,type:a,success:function(){i.fadeOut("slow"),toastr.success("User has been added to the staff")},failure:function(){i.hide(),toastr.error("Something went wrong")}})}),$(".delete-record").on("click",function(){var t=$(this).data("url"),e="Are you sure you want to permanently delete this application? This can't be undone.",a="/admin/permissions?id="+t,s=$(this).parentsUntil("tbody");confirm(e)&&$.ajax({url:a,type:"DELETE",success:function(t){toastr.success(t),s.hide()},failure:function(t){toastr.error(t)}})}),$(".permission-btn").on("click",function(){var e=$(this).data("status"),a="Active"==e?"inactive":"Active",s=$(this).data("user"),i="/admin/permissions?id="+s,n=t.bind(this);$.ajax({url:i,type:"PUT",data:{status:a},success:function(){n(e,a)},failure:function(){toastr.error("Something went wrong")}})}),$("#gm-modal .btn-success").on("click",function(){var t=$("form").serializeArray(),e=t.reduce(function(t,e){return e.division=t.division||[],e.division.push(e.value),e},{}),a=$(this).attr("id");e.division.length&&($("#gm-modal").modal("hide"),$.ajax({url:"/admin/assign/manager?id="+a,type:"PUT",data:{division:e.division,status:"Active"},success:function(t){console.log(t)}}))})})},function(t,e){"use strict";$(document).ready(function(){function t(){var t=$("select option:selected").text();window.location.hash=t,$.each(r,function(){$(this).data("teamname")==t&&$(this).addClass("team-table-active")});var e=$(".team-table-active").data("teamname"),a=$(".team-table-active").data("division");$(".team-roster-display").text(t),$("#export-team").attr("href",h+"?q="+e),$("#export-division").attr("href",u+"?q="+a)}function e(){c?(n(),$(".team-name").prop("disabled",!1),$(".team-name").css("opacity","1"),$(".roster-checkbox").hide(),$(".td-checkbox span").show(),$(".edit-roster-btn").html(d),$(".cancel-edit-btn").hide()):(o=a(),$(".team-name").prop("disabled",!0),$(".team-name").css("opacity","0.4"),$(".roster-checkbox").show(),$(".td-checkbox span").hide(),$(".cancel-edit-btn").show(),$(".edit-roster-btn").html(l)),$(".edit-roster-btn").toggleClass("btn-primary").toggleClass("btn-warning"),c=!c}function a(){var t={},e={};return $(".team-table-active").find(".td-checkbox").each(function(){var a=$(this).data("id"),s=$(this).data("field"),i=$(this).children("input").is(":checked");t[a]=t[a]||{},e[a]=e[a]||{},e[a][s]=i,t[a][s]=i}),function(t,a){if(2==arguments.length)e[t][a]=!e[t][a];else{if(1!=arguments.length)return e;e={}}}}function s(){$(".team-table-active").find(".td-checkbox").each(function(){var t=$(this).children("span").hasClass("glyphicon-check");$(this).children("input").prop("checked",t)}),o("reset"),e()}function i(){$(".team-table-active").find(".td-checkbox").each(function(){var t=$(this).children("input"),e=$(this).children("span");t.is(":checked")&&e.hasClass("glyphicon-remove")?e.addClass("glyphicon-check").removeClass("glyphicon-remove"):!t.is(":checked")&&e.hasClass("glyphicon-check")&&e.removeClass("glyphicon-check").addClass("glyphicon-remove")})}function n(){var t=o(),e=$(".edit-roster-btn").data("user"),a="/"+e+"/roster",s="PUT";jQuery.isEmptyObject(t)||$.ajax({url:a,type:s,data:t,success:i,failure:function(t){toastr.error(t)}})}var o,r=$(".team-table"),c=!1,l="<span class='glyphicon glyphicon-floppy-disk'></span>Save",d=$(".edit-roster-btn").html(),h=$("#export-team").attr("href"),u=$("#export-division").attr("href");$(".team-name").on("change",function(){$(".team-table-active").removeClass("team-table-active"),t()}),$(".cancel-edit-btn").on("click",s),$(".edit-roster-btn").on("click",e),$(".td-checkbox input").on("change",function(){var t=$(this).parent(),e=t.data("id"),a=t.data("field");o(e,a)}),window.location.hash&&$("select option").each(function(){var t=$(this).text();if(window.location.hash.substr(1)==t)return $(this).attr("selected",!0)}),location.pathname.match("roster")||t()})},function(t,e){"use strict";$(function(){function t(){var t=$(this).data();$(this).hasClass("btn-danger")?($(this).addClass("btn-warning").removeClass("btn-danger"),$(this).text("New Season"),$(this).css({color:"black"}),t.restore=!1):($(this).removeClass("btn-warning").addClass("btn-danger"),$(this).text("Restore Last Season"),$(this).css({color:"white"}),t.restore=!0)}$(".season-btn").on("click",function(){var e=$(this).data("team"),a=$(this).data("restore"),s=a?"&restore=true":"",i=t.bind(this);$.ajax({type:"PUT",url:"/admin/new/season?name="+e+s,success:function(t){i(),toastr.success(t)},failure:function(t){toastr.error(t)}})}),$("#seasons-modal").modal("show")})},function(t,e){"use strict";!function(){function t(t){return t.reduce(function(t,e){return t[e.name]=e.value,t},{})}var e="name";toastr.options.closeButton=!0,toastr.options.closeDuration=60,toastr.options.closeEasing="swing",toastr.options.showMethod="slideDown",$("#coach-modal, #player-modal").on("show.bs.modal",function(t){var e=$(t.relatedTarget),a=e.data("person"),s=e.data("url");$(this).find(".btn-primary").data({type:e.data("type")}),$(this).find(".btn-primary").attr("id",s),$(this).find(".modal-title").text(a)}),$("#coach-modal .btn-primary, #player-modal .btn-primary").on("click",function(e){var a=$("form").serializeArray(),s=t(a),i=$(this).attr("id"),n=$("#player-modal .modal-title, #coach-modal .modal-title").text(),o=$("form").attr("action")+i,r=$(this).data().type,c="Default"==r||"Goalie"==r?"PUT":"POST",l=location.pathname.match("/admin/assign/player")?"tbody":".row",d=$("button[data-url='"+i+"']").parentsUntil(l);!s.name||s.hasOwnProperty("role")&&!s.role||$.ajax({url:o,data:s,type:c,success:function(t){d.hide(),toastr.success(n+" has been successfully added to the "+s.name+" roster.")},failure:function(t){toastr.error(t)}})}),$(".btn-delete").on("click",function(){var t=$(this).data("url"),e="Are you sure you want to permanently delete this application? This can't be undone.",a="/admin/assign?id="+t,s=$(this).parentsUntil("tbody"),i=$(this).parentsUntil(".row"),n=$(".panel-default").length?i:s;confirm(e)&&$.ajax({url:a,type:"DELETE",success:function(t){toastr.success(t),n.hide()}})}),$(".btn-delete2").on("click",function(){var t=$(this).data("url"),e="Are you sure you to cut this player?",a="/admin/archive-player?id="+t,s=$(this).parentsUntil("tbody");confirm(e)&&$.ajax({url:a,type:"PUT",success:function(t){alert(t),s.hide()}})}),$("input[name='filter-players']").on("change",function(){$(".search-players").attr("list",$(this).val()),e=$(this).val()}),$(".search-players").on("input",function(){var t=$(this).val(),a=new RegExp(t,"i");0==t.length?$("table tr").show():$(".table tbody tr").each(function(){"teams"==e&&$(this).data("team")==t?$(this).show():"name"==e&&a.test($(this).data("person"))?$(this).show():$(this).hide()})})}()}]);