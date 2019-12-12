$(document).ready(function () {
  $("#login").click(function () {
    console.log('testing')
    let data = {
      accountName: $('#username').val(),
      password: $('#password').val()
    };
    apiRequest('http://localhost:8080/login', 'POST', data).then(result => {
      console.log(result)
      localStorage.setItem("token", result.token);
      apiRequest("http://localhost:8080/dashboard", "GET").then(res => {
        window.location.href = "./dashboard";
      })
      apiRequestLogin("http://localhost:8080/getAccess", "POST", { access: "admin" }).then(res => {
      })
    })
    // if ($("#username").val() == "admin" && $("#password").val() == "admin") {
    //   apiRequest("http://localhost:8080/dashboard", "GET").then(res => {
    //     window.location.href = "./dashboard";
    //   })
    //   apiRequestLogin("http://localhost:8080/getAccess", "POST", { access: "admin" }).then(res => {
    //   })
    // } else if ($("#username").val() == "staff" && $("#password").val() == "staff") {
    //   apiRequest("http://localhost:8080/dashboard", "GET").then(res => {
    //     window.location.href = "./dashboard";
    //   })
    //   apiRequestLogin("http://localhost:8080/getAccess", "POST", { access: "staff" }).then(res => {
    //   })
    // } else {
    //   swal({
    //     icon: "error",
    //     text: "Account not Found!"
    //   });
    // }
  })

  function apiRequest(apiurl, method, data) {
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

  function apiRequestLogin(apiurl, method, data) {
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