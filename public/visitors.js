$(document).ready(function() {
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

    $(document).on('click', '#tabledelete', function() {

        var a = $(this).closest('tr').attr('id');
        var b = $(this).closest('tr').attr('class');
        let url = 'http://localhost:8080/delete/' + a;
        let data = { id: b };
        let method = 'PUT'
        apiRequest(url, data, method).then(res => {
            $("#" + a).remove();
        })
    });

    $("#home").click(function() {
        window.location.href = "index.html";
    })

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
})