var schema = require("../schema");

module.exports = function(reqYear, res) {
  schema.Visitors.aggregate(
    [
      { $unwind: "$visitors" },
      {
        $group: {
          _id: "$visitors.address",
          total: { $sum: 1 },
          date: { $push: "$visitors.date" }
        }
      }
    ],
    function(err, result) {
      if (err) {
        next(err);
      } else {
        let year = reqYear;
        let places = [];
        let resPlace = [];
        let resCount = [];

        //checking year
        for (var i = 0; i < result.length; ++i) {
          let regex = new RegExp(`.*${year}.*`);
          for (var j = 0; j < result[i].date.length; ++j) {
            if (regex.test(result[i].date[j])) {
              let data = {
                place: result[i]._id,
                count: result[i].date[j]
              };
              places.push(data);
            }
          }
        }

        //counting occurences of an element in PLACES
        var prev;
        for (var i = 0; i < places.length; i++) {
          if (places[i].place !== prev) {
            resPlace.push(places[i].place);
            // a.push(arr[i]);
            resCount.push(1);
            // b.push(1);
          } else {
            resCount[resCount.length - 1]++;
          }
          prev = places[i].place;
        }

        console.log(resPlace);
        console.log(resCount);
        res.send({ places: resPlace, total: resCount });
      }
    }
  );
};
