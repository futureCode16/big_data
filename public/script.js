var placesAutocomplete = places({
    container: document.querySelector('#Vaddress'),
    type: 'city'
});



$(document).ready(function() {

    $("#address-input").change(() => {
        $("#address-input").prop('disabled', true);
        alert("test")
    })

    $("#retrieveAll").click(function() {
        window.location.href = "visitors.html";
    })

    var studentName;
    var studentData;
    var listOfVisitors = [];

    $("#go").click(function() {
        studentName = $('#name').val()
        if (studentName !== "") {
            studentName = studentName.toLowerCase().split(',');
            let check = '';
            let method = 'GET'
            let url = 'http://localhost:8080/checking';
            studentData = { firstname: studentName[1], lastname: studentName[0] };
            apiRequest(url, studentData, method).then(res => {
                check = res;
                listOfVisitors.push(check.visitors) //add the visitors of the specific student to the LIST above
                if (check.exists) {
                    $('#VisitorLog').modal('toggle');
                    $('#VisitorLog').modal('show');
                    $('#modalName').html(studentData.lastname + ", " + studentData.firstname);
                    let name = check.name.firstname + ' ' + check.name.lastname;
                    let address = check.address;
                    let batch = check.batch;
                    let age = check.age;
                    let gender = check.gender;

                    $('#sName').html(name);
                    $('#sAddress').html(address);
                    $('#sBatch').html(batch);
                    $('#sAge').html(age);
                    $('#sGender').html(gender);
                    //
                    //show visitor per Student
                    //
                    showVisitors();
                } else {
                    swal({
                        icon: "error",
                        text: "Student not Found!"
                    });
                }
                //add attribute to delete visitor info per student
                $(document).on('click', '#vListDelete', function() {
                    let a = check._id;
                    let b = $(this).closest('tr').attr('id');
                    let url = 'http://localhost:8080/delete/' + a;
                    let data = { id: b };
                    let method = 'PUT'
                    apiRequest(url, data, method).then(res => {
                        if (res.data.body.nModified === 1) {
                            $('#' + b).remove();
                        }
                    })
                });
                //
                //add attribute to Update visitor info per student
                //
                $(document).on('click', '#vListEdit', function() {
                    //
                    /*select all visitor's information*/
                    //
                    let vListFname = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(1).children().eq(1).text();
                    console.log(vListFname)
                    let vListLname = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(2).children().eq(1).text();
                    let vListGender = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(3).children().eq(1).text();
                    let vListAge = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(4).children().eq(1).text();
                    let vListAddress = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(5).children().eq(1).text();
                    let vListDate = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(6).children().eq(1).text();
                    let vListFnameClear = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(1).children().eq(1).text("");
                    let vListLnameClear = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(2).children().eq(1).text("");
                    let vListGenderClear = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(3).children().eq(1).text("");
                    let vListAgeClear = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(4).children().eq(1).text("");
                    let vListAddressClear = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(5).children().eq(1).text("");
                    let vListDateClear = $(this).closest('tr').children().eq(0).children().eq(0).children().eq(6).children().eq(1).text("");
                    //
                    /*show all input Field*/
                    //
                    $('<input>', {
                        type: 'text',
                        class: 'vListInfoUpdate',
                        value: vListFname
                    }).appendTo(vListFnameClear);
                    $('<input>', {
                        type: 'text',
                        class: 'vListInfoUpdate',
                        value: vListLname
                    }).appendTo(vListLnameClear);
                    $('<input>', {
                        type: 'text',
                        class: 'vListInfoUpdate',
                        value: vListGender
                    }).appendTo(vListGenderClear);
                    // let gender = $('<select>', {
                    //   class: 'vListInfoUpdate',
                    // }).appendTo(vListGenderClear);
                    // gender.append($("<option>").attr('value', "Male").text("Male"));
                    // gender.append($("<option>").attr('value', "Female").text("Female"));
                    $('<input>', {
                        type: 'number',
                        class: 'vListInfoUpdate',
                        value: vListAge
                    }).appendTo(vListAgeClear);
                    $('<input>', {
                        type: 'text',
                        class: 'vListInfoUpdate',
                        value: vListAddress
                    }).appendTo(vListAddressClear);
                    $('<input>', {
                        type: 'text',
                        class: 'vListInfoUpdate',
                        value: vListDate
                    }).appendTo(vListDateClear);
                    /*end of showing input Field*/
                    //
                    /*show submit and cancel button represented by x and a check*/
                    let vListSubmitCancel = "<div class='visitorList col-md-12 d-flex justify-content-end'>" +
                        "<i class='vListSubmitc far fa-check-circle'></i><i class='vListSubmitCancelx far fa-times-circle'></i></div>"
                    $(this).closest('tr').children().eq(0).children().append(vListSubmitCancel);
                    /*end of showing x and a check*/
                    //
                    //
                    /* add attribute to cancel button represented by x */
                    //
                    $(document).on('click', '.vListSubmitCancelx', function() {
                        //
                        /*this field just bring back the previous value of the visitor's info*/
                        //
                        vListFnameClear.html(vListFname)
                        vListLnameClear.html(vListLname)
                        vListGenderClear.html(vListGender)
                        vListAgeClear.html(vListAge)
                        vListAddressClear.html(vListAddress)
                        vListDateClear.html(vListDate)
                        $(this).closest('tr').children().eq(0).children().eq(0).children().eq(7).remove() //remove the submit and cancel button
                    });
                    //
                    //
                    /*add attribute to submit button represented by a check symbol*/
                    //
                    $(document).on('click', '.vListSubmitc', function() {
                        console.log('student id' + check._id)
                        let vUpdatedFname = vListFnameClear.children().eq(0).val();
                        let vUpdatedLname = vListLnameClear.children().eq(0).val();
                        //   $('[name=options] option').filter(function() { 
                        //     return ($(this).text() == 'Blue'); //To select Blue
                        // }).prop('selected', true);
                        // let updatedGender = $(vListGenderClear).children().eq(0).children()
                        // for (var key in updatedGender) {
                        //   if (key === '0' || key === '1') {
                        //     if (updatedGender[key].selected) {
                        //       console.log(updatedGender[key].text)
                        //     }
                        //   }
                        // }
                        // console.log(updatedGender)
                        let vUpdatedGender = vListGenderClear.children().eq(0).val();
                        let vUpdatedAge = vListAgeClear.children().eq(0).val();
                        let vUpdatedAddress = vListAddressClear.children().eq(0).val();
                        let vUpdatedDate = vListDateClear.children().eq(0).val();
                        let visitorId = $(this).closest('tr').attr('id')
                        let url = 'http://localhost:8080/update/' + check._id;
                        let method = 'PUT'
                        let data = { '_id': visitorId, 'firstname': vUpdatedFname, 'lastname': vUpdatedLname, 'age': vUpdatedAge, 'gender': vUpdatedGender, 'address': vUpdatedAddress, 'date': vUpdatedDate };
                        apiRequest(url, data, method).then(res => {
                                $('#vTableList').empty();
                                for (var i = 0; i < listOfVisitors[0].length; ++i) {
                                    // console.log(JSON.stringify(listOfVisitors[0][i]))
                                    if (listOfVisitors[0][i]._id === res.data.body._id) {
                                        listOfVisitors[0].splice(i, 1);
                                        listOfVisitors[0].splice(i, 0, res.data.body);
                                        // listOfVisitors[0].push(res.data.body)
                                        // console.log(JSON.stringify(listOfVisitors[0]))
                                    }
                                }
                                showVisitors();
                                // console.log(res)
                            })
                            // console.log($(this).closest('tr').attr('id'))
                    });
                })
            });
        }
    });

    //clear the input fields upon closing the modal
    $('#vClose').click(function() {
        student = {};
        studentName = "";
        $('#name').val("");
        $('#Vfname').val("");
        $('#Vlname').val("");
        $('#Vage').val("");
        $('#Vaddress').val("");
    })

    //retrieve all visitors
    $('#retrieveAll').click(function() {
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
                        var data = '<tr id=' + body[i]._id + ' class=' + body[i].visitors[x]._id + '>' +
                            '<td>' + body[i].name.lastname + ', ' + body[i].name.firstname + '</td>' +
                            '<td>' + body[i].visitors[x].lastname + '</td>' +
                            '<td>' + body[i].visitors[x].firstname + '</td>' +
                            '<td>' + body[i].visitors[x].age + '</td>' +
                            '<td>' + body[i].visitors[x].gender + '</td>' +
                            '<td>' + body[i].visitors[x].address + '</td>' +
                            '<td>' + update + '</td>' +
                            '<td>' + Delete + '</td>' +
                            '</tr>';
                        $('#vRVisitors').css({ 'font-size': '12px' }).append(data);
                    }
                }
            }
        });
        //end of retrieving all visitors
    })

    $(document).on('click', '#tabledelete', function() {

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

    $(document).on('click', '#tableUpdate', function() {
        var row = $(this).closest('tr').children()

        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        $('#updateModal').modal('show');

        $('#updateSave').click(function() {
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

    $('#vSubmit').on('click', function() {
        var firstName = $('#Vfname').val();
        var lastName = $('#Vlname').val();
        var age = Number($('#Vage').val());
        var gender = $('#Vsex option:selected').text()
        var address = $('#Vaddress').val();
        let requestUrl = 'http://localhost:8080/add';
        let method = 'PUT'
        var visitors = { 'firstname': firstName, 'lastname': lastName, 'age': age, 'gender': gender, 'address': address, 'date': moment().format('YYYY MMMM Do, h:mm:ss a') };

        // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

        let data = { student: studentData, visitor: visitors };

        // console.log(age)
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

    function showVisitors() {
        listOfVisitors[0].forEach(function(item) {
            let div = "<tr id=" + item._id + "><td><div class='col-md-12'>" +
                "<div class='visitorList col-md-12 d-flex justify-content-end'>" +
                "<i id='vListEdit' class='fas fa-pencil-alt'></i><i id=vListDelete class='far fa-trash-alt'></i></div>" +
                "<p><b>First Name : </b><i id='vListFname'>" + item.firstname + "</i></p>" +
                "<p><b>Last Name : </b><i id='vListLname'>" + item.lastname + "</i></p>" +
                "<p><b>Gender : </b><i id='vListGender'>" + item.gender + "</i></p>" +
                "<p><b>Age : </b><i id='vListAge'>" + item.age + "</i></p>" +
                "<p><b>Address : </b><i id='vListAddress'>" + item.address + "</i></p>" +
                "<p><b>Date/Time : </b><i id='vListDate'>" + item.date + "</i></p>" +
                "</div></td></tr>";
            $('#vTableList').append(div)
        })
    }

    function apiRequest(apiurl, apidata, method) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiurl,
                data: apidata,
                type: method,
                success: function(result) {
                    resolve(result)
                },
                error: function(error) {
                    reject(error)
                }
            });
        })
    }

    $("#addNow").click(function() {
        var firstName = $('#studentFirstName').val();
        var lastName = $('#studentLastName').val();
        var age = Number($('#studentAge').val());
        var gender = $('#studentSex option:selected').text()
        var address = $('#studentAddress').val();
        let requestUrl = 'http://localhost:8080/addStudent';
        let method = 'POST'
        var student = {
            "name": {
                "firstname": firstName,
                "lastname": lastName
            },
            "age": age,
            "gender": gender,
            "address": address
        };

        if (firstName !== "" && lastName !== "" && age !== 0 && address !== "") {
            apiRequest(requestUrl, student, method).then(res => {
                    swal({
                        icon: "success",
                        text: "Student has been added!"
                    });
                    $('#studentFirstname').val("");
                    $('#studentLastname').val("");
                    $('#studentAge').val("");
                    $('#studentAddress').val("");
                })
                .catch(error => console.log(error))
        } else {
            $('.alert').fadeIn();
            $('.alert').fadeOut(3000);
        }
    })

    $("#display").click(function() {
        let method = "GET";
        let url = 'http://localhost:8080/retrieve-all-student';
        let data = "";
        apiRequest(url, data, method).then(response => window.location.href = "./students.html")
    })

});