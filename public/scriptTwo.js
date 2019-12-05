$(document).ready(function () {
  $("#login").click(function(){
    if ($("#username").val() == "Lalaine" && $("#password").val() == "pass") {
      apiRequest("http://localhost:8080/","GET").then(res =>{
        window.location.href = "./";
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