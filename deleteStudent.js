let models = require("./schema");
let response = require("./helper");
var ObjectId = require('mongodb').ObjectID;

module.exports = function(studentId, res) {
    models.Visitors.remove({ '_id': ObjectId(studentId) }, (err, result) => {
        response.error = false;
        response.status = 200;
        response.data.body = result;
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