let models = require("./schema");
let response = require("./helper");

module.exports = function(req, res) {
    models.Visitors.find({}, (err, visitors) => {
        response.error = false;
        response.status = 200;
        response.data.body = visitors;
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