$(document).ready(function () {

    let method = "GET";
    let url = 'http://localhost:8080/retrieve-all-student';
    let data = "";
    apiRequest(url, data, method).then(res => {
        console.log(res)
        $("#table").show();
        $("#table").fadeIn();
        var body = res.data.body;
        var update = '<button id="studentUpdate" type="button" class="btn hideME2 btn-outline-primary">update</button>';
        var Delete = '<button id="studentDelete"type="button" class="btn hideME2 btn-outline-danger">delete</button>';
        $("table tbody tr").empty();

        for (var i = 0; i < body.length; ++i) {
            if (body[i].length !== 0) {
                var data = '<tr id=' + body[i]._id + ' class=' + body[i]._id + '>' +
                    '<td>' + body[i].name.lastname + '</td>' +
                    '<td>' + body[i].name.firstname + '</td>' +
                    '<td>' + body[i].age + '</td>' +
                    '<td>' + body[i].gender + '</td>' +
                    '<td>' + body[i].address + '</td>' +
                    '<td>' + update + '</td>' +
                    '<td>' + Delete + '</td>' +
                    '<td>' + body[i].visitors.length + '</td>' +
                    '</tr>';
                $('#students').css({ 'font-size': '12px' }).append(data);
            }
        }
    });
    

    var account = ""

    $("#updateHeader").hide();
    $("#deleteHeader").hide();
    $(".hideME2").hide()
    $(".hideME2").hide()

    apiRequestLogin("http://localhost:8080/getAccess", "GET").then(res => {
        account = res
        if (account === "admin") {
            $("#updateHeader").show();
            $("#deleteHeader").show();
            $(".hideME2").show()
            $(".hideME2").show()
        } else {
            $("#updateHeader").hide();
            $("#deleteHeader").hide();
            $(".hideME2").hide()
            $(".hideME2").hide()
        }
        console.log(account)
    })

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

    function apiRequest(apiurl, apidata, method) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiurl,
                data: apidata,
                type: method,
                success: function (result) {
                    resolve(result)
                },
                error: function (error) {
                    reject(error)
                }
            });
        })
    }

    $(document).on('click', '#studentDelete', function () {
        console.log($(this).closest('tr').attr('id'))
        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        let url = 'http://localhost:8080/deleteStudent/' + a;
        let data = { id: b };
        let method = 'PUT'
        apiRequest(url, data, method).then(res => {
            if (res.data.body.nModified === 1) {
                $(this).closest('tr').remove();
            }
        })
    });

    $(document).on('click', '#studentUpdate', function () {

        var row = $(this).closest('tr').children()

        $('#studentupdateFirstName').val(row.eq(0).text());
        $('#studentupdateLastName').val(row.eq(1).text());
        $('#studentupdateAge').val(row.eq(2).text());
        $('#studentupdateSex option:selected').text(row.eq(3).text())
        $('#studentupdateAddress').val(row.eq(4).text());

        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        $('#studentupdateModal').modal('show');

        $('#studentupdateSave').click(function () {
            var updatedFirstName = $('#studentupdateFirstName').val();
            var updatedLastName = $('#studentupdateLastName').val();
            var updatedAge = $('#studentupdateAge').val();
            var updatedGender = $('#studentupdateSex option:selected').text()
            var updatedAddress = $('#studentupdateAddress').val();
            let url = 'http://localhost:8080/updateStudent/' + a;
            let method = 'PUT'
            let data = { 'id': b, 'firstname': updatedFirstName, 'lastname': updatedLastName, 'age': updatedAge, 'gender': updatedGender, 'address': updatedAddress };

            apiRequest(url, data, method).then(res => {
                // console.log(res)
                row.eq(0).text(res.data.body.lastname)
                row.eq(1).text(res.data.body.firstname)
                row.eq(2).text(res.data.body.age)
                row.eq(3).text(res.data.body.gender)
                row.eq(4).text(res.data.body.address)
            });

        });

    })

    $(document).on('click', '#studentDelete', function () {

        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        let url = 'http://localhost:8080/delete/' + a;
        let data = { id: b };
        let method = 'PUT'
        apiRequest(url, data, method).then(res => {
            $('#' + a).hide();

        })
    });

    $("#home").click(function() {
        window.location.href='index.html'
    })

})