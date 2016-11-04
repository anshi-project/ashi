$(document).ready(function(){

var teams=["U16","U18","U20","Men\'s Team USA",
            "Women\'s Team USA","Men\'s Master\'s Team USA",
            "Men\'s Master\'s Team DC","Women\'s Team Red","Women\'s Team Blue"];
var positions=["Left Wing","Right Wing", "Center", "Goalie","Right Defense","Left Defense"];
var divisions=["Junior\'s","Men\'s","Women\'s","Women\'s Master\'s","Men's Master\'s"];

jQuery.fn.extend({
    createDropdown:function(array,fieldName,label){
        var currVal=$("input[name='"+fieldName+"']").val();
        var html=`<label for='${fieldName}' class='control-form'>${label}:</label><select name='${fieldName}' class='form-control'><option value='${currVal}'>${currVal}</option>`
        array.forEach(function(p){if(p!=currVal){html+=`<option value="${p}">${p}</option>`}})
        html+="</select>";
        this.html(html);
    }
})

    $(".position-dropdown").createDropdown(positions,"team[position]","Position:");
    $(".team-dropdown").createDropdown(teams,"team[name]","Team:");
    $(".division-dropdown").createDropdown(divisions,"division","Division:");
})
