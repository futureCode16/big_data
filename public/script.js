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
        console.log(check)
        if (check.exists) {
          $('#VisitorLog').modal('toggle');
          $('#VisitorLog').modal('show');
          $('#modalName').html(studentData.lastname + ", " + studentData.firstname);
          var name = check.name.firstname + ' ' + check.name.lastname;
          var address = check.address;
          var batch = check.batch;
          var age = check.age;
          var gender = check.gender;

          $('#sName').html(name);
          $('#sAddress').html(address);
          $('#sBatch').html(batch);
          $('#sAge').html(age);
          $('#sGender').html(gender);

          //show visitor per Student
          check.visitors.forEach(function (item) {
            let div = "<tr id="+item.id+"><td><div class='col-md-12'>" + 
            "<div class='visitorList col-md-12 d-flex justify-content-end'>"+
            "<b id=vListDelete>x</b></div>"+
             "<p><b>First Name : </b>"+item.firstname+"</p>"+
             "<p><b>Last Name : </b>"+item.lastname+"</p>"+
             "<p><b>Gender : </b>"+item.gender+"</p>"+
             "<p><b>Age : </b>"+item.age+"</p>"+
             "<p><b>Address : </b>"+item.address+"</p>"+
             "<p><b>Date/Time : </b>"+item.date+"</p>"+
            "</div></td></tr>";
            $('#vTableList').append(div)
          })
        } else {
          swal({
            icon: "error",
            text: "Student not Found!"
          });
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

  $('#retrieveAll').click(function () {
    let method = "GET";
    let url = 'http://localhost:8080/retrieve-all';
    let data = "";
    apiRequest(url, data, method).then(res => {
      $("#table").show();
      $("#table").fadeIn();
      var body = res.data.body;
      var update = '<button id="tableUpdate" type="button" class="btn btn-outline-primary">update</button>';
      var Delete = '<button id="tabledelete"type="button" class="btn btn-outline-danger">delete</button>';
      if ($("table tbody tr").length >= 1) {
        for (var i = 0; i < $("table tbody tr").length; ++i) {
          $("table tbody tr").remove();
        }
      }

      for (var i = 0; i < body.length; ++i) {
        for (var x = 0; x < body[i].visitors.length; ++x) {
          if (body[i].visitors.length !== 0) {
            var data = '<tr id=' + body[i]._id + ' class=' + body[i].visitors[x].id + '>' +
              '<td>' + body[i].name.lastname + ', ' + body[i].name.firstname + '</td>' +
              '<td>' + body[i].visitors[x].lastname + '</td>' +
              '<td>' + body[i].visitors[x].firstname + '</td>' +
              '<td>' + body[i].visitors[x].age + '</td>' +
              '<td>' + body[i].visitors[x].gender + '</td>' +
              '<td>' + body[i].visitors[x].address + '</td>' +
              '<td>' + update + '</td>' +
              '<td>' + Delete + '</td>' +
              '</tr>';
            $('tbody').css({ 'font-size': '12px' }).append(data);
          }
        }
      }
    });
  })

  $(document).on('click', '#tabledelete', function () {

    var a = $(this).closest('tr').attr('id');
    var b = $(this).closest('tr').attr('class');
    let url = 'http://localhost:8080/delete/' + a;
    let data = { id: b };
    let method = 'PUT'
    apiRequest(url, data, method).then(res => {
      if (res.data.body.nModified === 1) {
        $('#' + a).remove();
      }
    })
  });

  $(document).on('click', '#tableUpdate', function () {
    var row = $(this).closest('tr').children()

    var a = $(this).closest('tr').attr('id');
    var b = $(this).closest('tr').attr('class');
    $('#updateModal').modal('show');

    $('#updateSave').click(function () {
      var updatedFirstName = $('#updateFirstName').val();
      var updatedLastName = $('#updateLastName').val();
      var updatedAge = $('#updateAge').val();
      var updatedGender = $('#updateSex option:selected').text()
      var updatedAddress = $('#updateAddress').val();
      let url = 'http://localhost:8080/update/' + a;
      let method = 'PUT'
      let data = { 'id': b, 'firstname': updatedFirstName, 'lastname': updatedLastName, 'age': updatedAge, 'gender': updatedGender, 'address': updatedAddress };

      apiRequest(url, data, method).then(res => {
        // console.log(res)
        row.eq(1).text(res.data.body.lastname)
        row.eq(2).text(res.data.body.firstname)
        row.eq(3).text(res.data.body.age)
        row.eq(4).text(res.data.body.gender)
        row.eq(5).text(res.data.body.address)
      });

    });

  })

  $('#vSubmit').on('click', function () {
    var firstName = $('#Vfname').val();
    var lastName = $('#Vlname').val();
    var age = Number($('#Vage').val());
    var gender = $('#Vsex option:selected').text()
    var address = $('#Vaddress').val();
    let requestUrl = 'http://localhost:8080/add';
    let method = 'PUT'
    var visitors = { 'firstname': firstName, 'lastname': lastName, 'age': age, 'gender': gender, 'address': address, 'date': moment().format('MMMM Do YYYY, h:mm:ss a') };

    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

    let data = { student: studentData, visitor: visitors };

    console.log(age)
    if (firstName !== "" && lastName !== "" && age !== 0 && address !== "") {
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
    } else {
      $('.alert').fadeIn();
      $('.alert').fadeOut(3000);
    }
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