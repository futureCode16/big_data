$(document).ready(function () {
  $("#login").click(function(){
    if ($("#username").val() == "admin" && $("#password").val() == "admin") {
      apiRequest("http://localhost:8080/dashboard","GET").then(res =>{
        window.location.href = "./dashboard";
       })
    } else {
      swal({
        icon: "error",
        text: "Account not Found!"
      });
    }
  })

  function apiRequest(apiurl,method) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiurl,
        type: method,
        success: function (result) {
          resolve(result)
        }, error: function (error) {
          reject(error)
        }
      });
    })
  }

})