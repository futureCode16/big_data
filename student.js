let models = require("./schema");
let response = require("./helper");

module.exports = function(req, res) {
    models.Visitors.find({}, (err, students) => {
        response.error = false;
        response.status = 200;
        response.data.body = students;
        res.send(response)
    }).sort({"name.lastname":1}).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};