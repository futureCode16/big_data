let models = require("./schema");

module.exports = function(student, res) {
    models.Visitors.findOne({name:student}, (err, visitors) => {
        if(visitors !== null){
            visitors["exists"] = true;
            res.send(visitors);
        }else{
            res.send({exists:false})
        }
    }).lean().catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};