var express = require('express');
var router = express.Router();
var app = express();
var port = 8080;
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var Delete = require('./delete');
var check = require('./check');
var add = require('./addVisitor');
var retrieveAll = require('./all');
var update = require('./update');
var schema = require('./schema');
require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.all('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/checking', function (req, res) {
    check(req.query, res)
})

app.put('/add', function (req, res) {
    add(req.body.student, req.body.visitor, res)
})

app.put('/update/:id', function (req, res) {
    update(req.params.id, req.body, res);
})

app.get('/retrieve-all', function (req, res) {
    retrieveAll(req, res);
})

app.put('/delete/:id', (req, res) => {
    Delete(req.params.id, req.body.id, res);
});

app.get('/chart/location/:year', (req, res) => {
    console.log(req.params)
    // res.send({key:"OKAY TAYO"})

    schema.Visitors.aggregate([
        { $unwind: "$visitors" },
        {
            $group: {
                _id: '$visitors.address', total: { $sum: 1 },
                date: { $push: '$visitors.date' }
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            let year = req.params.year
            let places = []
            let resPlace = []
            let resCount = []

            //checking year 
            for (var i = 0; i < result.length; ++i) {
                let regex = new RegExp(`.*${year}.*`)
                for (var j = 0; j < result[i].date.length; ++j) {
                    if (regex.test(result[i].date[j])) {
                        let data = {
                            place: result[i]._id,
                            count: result[i].date[j]
                        }
                        places.push(data)
                    }
                }
            }

            //counting occurences of an element in PLACES
            var prev;
            for (var i = 0; i < places.length; i++) {
                if (places[i].place !== prev) {
                    resPlace.push(places[i].place)
                    // a.push(arr[i]);
                    resCount.push(1)
                    // b.push(1);
                } else {
                    resCount[resCount.length - 1]++;
                }
                prev = places[i].place;
            }

            console.log(resPlace)
            console.log(resCount)
            res.send({ places: resPlace, total: resCount })
        }
    });

})

app.get('/chart/perStudent/:firstname/:lastname', (req, res) => {
    let firstname = req.params.firstname.
        substring(12, req.params.firstname.length)
    let lastname = req.params.lastname

    // res.send('OKAYY')
    // schema.Visitors.findOne({
    //     "name.firstname":firstname,
    //     "name.lastname":lastname
    // },(err,student)=>{
    //     student
    // }).select({"visitors":1,"_id":0})
    schema.Visitors.aggregate([
        {
            $match: {
                'name.firstname': firstname,
                'name.lastname': lastname
            }
        },
        {
            $unwind: '$visitors'
        },
        {
            $group: { _id: '$visitors.date', total: { $sum: 1 } }
        }
    ], (err, result) => {
        // for (var i = 0; result.length; ++i) {
        //     console.log(result)
        //     let regex = new RegExp(`.*2018.*`)
        //     if(regex.test(result[i]._id)){}
        // }

        //I STOPPED HERE, NEEDED TO ADD DATE ON DB IN DATABASE LEVEL
        console.log(result)
    })

})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './views/404.html'));
});

http.listen(port, function () {
    console.log('listening to port: ' + port);
});