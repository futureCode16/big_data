$(document).ready(function () {
  $("#login").click(function(){
    if ($("#username").val() == "admin" && $("#password").val() == "admin") {
      apiRequest("http://localhost:8080/dashboard","GET").then(res =>{
        window.location.href = "./dashboard";
      })
      apiRequestLogin("http://localhost:8080/getAccess","POST", {access: "admin"}).then(res =>{
      })
    } else if ($("#username").val() == "user" && $("#password").val() == "user") {
      apiRequest("http://localhost:8080/dashboard","GET").then(res =>{
        window.location.href = "./dashboard";
      })
      apiRequestLogin("http://localhost:8080/getAccess","POST", {access: "user"}).then(res =>{
        
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

  function apiRequestLogin(apiurl,method, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiurl,
        type: method,
        data: data,
        success: function (result) {
          resolve(result)
        }, error: function (error) {
          reject(error)
        }
      });
    })
  }

})