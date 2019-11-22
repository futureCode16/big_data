let models = require("./schema");
let response = require("./helper");
var ObjectId = require('mongodb').ObjectID;

module.exports = function(studentId,id, res) {
    models.Visitors.updateMany({'_id':ObjectId(studentId)}, { $pull: { visitors:{"id":ObjectId(id)} }},{ safe: true, multi:true }, (err, result) => {
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