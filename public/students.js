$(document).ready(function() {
    let method = "GET";
    let url = 'http://localhost:8080/retrieve-all-student';
    let data = "";
    apiRequest(url, data, method).then(res => {
        $("#table").show();
        $("#table").fadeIn();
        var body = res.data.body;
        console.log(body)
        var update = '<button id="studentUpdate" type="button" class="btn btn-outline-primary">update</button>';
        var Delete = '<button id="studentDelete"type="button" class="btn btn-outline-danger">delete</button>';
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
                    '</tr>';
                $('#students').css({ 'font-size': '12px' }).append(data);
            }
        }
    });

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

    $(document).on('click', '#studentDelete', function() {
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

    $(document).on('click', '#studentUpdate', function() {
        var row = $(this).closest('tr').children()
        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        $('#studentupdateModal').modal('show');
    })

    $(document).on('click', '#studentDelete', function() {

        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        let url = 'http://localhost:8080/delete/' + a;
        let data = { id: b };
        let method = 'PUT'
        apiRequest(url, data, method).then(res => {
            $('#' + a).hide();

        })
    });

    $('#studentupdateSave').click(function() {
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