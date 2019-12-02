$(document).ready(function () {

  var studentName;
  var studentData;

  $("#go").click(function () {
    studentName = $('#name').val()
    if (studentName !== "") {
      studentName = studentName.toLowerCase().split(',');

      // console.log('checking')

      let method = 'GET'
      let url = 'http://localhost:8080/checking';
      studentData = { firstname: studentName[1], lastname: studentName[0] };
      var check;
      apiRequest(url, studentData, method).then(res => {
        check = res;
        // console.log(res);
        if (check.exists) {
          $('#VisitorLog').modal('toggle');
          $('#VisitorLog').modal('show');
          $('#modalName').html(studentData.lastname + ", " + studentData.firstname);
          var name = check.name.firstname+' '+check.name.lastname;
          var address = check.address;
          var batch = check.batch;
          var age = check.age;
          var gender = check.gender;

          $('#sName').html(name);
          $('#sAddress').html(address);
          $('#sBatch').html(batch);
          $('#sAge').html(age);
          $('#sGender').html(gender);
        } else {
          swal({
            icon: "error",
            text: "Student not Found!"
          });
          // console.log('Student not Found!')
        }
      });
    }
  });

  $('#vClose').click(function () {
    student = {};
    studentName = "";
    $('#name').val("");
    $('#Vfname').val("");
    $('#Vlname').val("");
    $('#Vage').val("");
    $('#Vaddress').val("");
  })



  $('#vSubmit').on('click', function () {
    var firstName = $('#Vfname').val();
    var lastName = $('#Vlname').val();
    var age = $('#Vage').val();
    var gender = $('#Vsex option:selected').text()
    var address = $('#Vaddress').val();
    let requestUrl = 'http://localhost:8080/add';
    let method = 'PUT'
    var visitors = { 'firstname': firstName, 'lastname': lastName, 'age': age, 'gender': gender, 'address': address, 'date': moment().format('MMMM Do YYYY, h:mm:ss a') };

    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

    let data = { student: studentData, visitor: visitors };

    apiRequest(requestUrl, data, method).then(res => {
      swal({
        icon: "success",
        text: "Visitor has been added!"
      });
      $('#Vfname').val("");
      $('#Vlname').val("");
      $('#Vage').val("");
      $('#Vaddress').val("");
    });
  })

  function apiRequest(apiurl, apidata, method) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiurl,
        data: apidata,
        type: method,
        success: function (result) {
          resolve(result)
        }, error: function (error) {
          reject(error)
        }
      });
    })
  }
});