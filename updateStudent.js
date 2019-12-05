let models = require("./schema");
let response = require("./helper");
var ObjectId = require('mongodb').ObjectID;

module.exports = function(id, data, res) {
    models.Visitors.findOneAndUpdate({ '_id': ObjectId(id) }, { $set: { name: { firstname: data.firstname, lastname: data.lastname }, age: data.age, gender: data.gender, address: data.address } }, (err, result) => {
        response.error = false;
        response.status = 200;
        response.data.body = data;
        res.send(response)
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};