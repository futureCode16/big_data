const mongoose = require('mongoose');
let models = require("./schema");
let response = require("./helper")

module.exports = function(student,add, res) {
    var id = mongoose.Types.ObjectId();
    var visitor = add;
    visitor.id = id;
    models.Visitors.updateOne({name: student},{$addToSet:{visitors: visitor}},{multi:false}, (err,callback) => {
        response.error = false;
        response.status = 200;
        response.data.body = callback
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