$(document).ready(function(){
    $("#logout").click(function(){
        window.location.href = "login.html";
        $("#account").val("");
    })
})