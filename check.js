let models = require("./schema");

module.exports = function(student, res) {
    models.Visitors.findOne({name:student}, (err, visitors) => {
        if(visitors !== null){
            res.send({exists:true})
        }else{
            res.send({exists:false})
        }
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};