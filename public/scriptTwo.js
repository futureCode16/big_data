$(document).ready(function() {
    if ($('#username').val() == "" || $('#password').val() == "") {
        $("#login").attr("disabled", true);
      } else {
        $("#login").attr("disabled", false);
      }
})