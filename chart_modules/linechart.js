var schema = require("../schema");

module.exports = function(req, res) {
  let firstname = req.params.firstname.substring(
    8,
    req.params.firstname.length
  );
  let lastname = req.params.lastname;
  let date = [];
  let total = [];
  console.log(firstname);

  schema.Visitors.aggregate(
    [
      {
        $match: {
          "name.firstname": firstname,
          "name.lastname": lastname
        }
      },
      {
        $unwind: "$visitors"
      },
      {
        $group: { _id: "$visitors.date", total: { $sum: 1 } }
      }
    ],
    (err, result) => {
      //SORT TO ENABLE COUNTING
      result.sort(function(a, b) {
        return a._id > b._id;
      });

      var prev;
      for (var i = 0; i < result.length; i++) {
        var sub = result[i]._id.substring(13, 17);
        if (sub !== prev) {
          date.push(sub);
          total.push(1);
        } else {
          total[total.length - 1]++;
        }
        prev = sub;
      }
      let data = {
        date: date,
        total: total
      };
      res.send(data);
    }
  );
};
