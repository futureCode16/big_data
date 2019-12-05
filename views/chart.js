$("#statistics").on("click", () => {
  window.location.href = "./index.html";
});
var ctx = $("#myChart")[0].getContext("2d");
var ctx2 = $("#myChart2")[0].getContext("2d");
var input = document.getElementById("input");
var content = [];
$("#myChart").hide();
$("#myChart2").hide();
var barChart = null;
var lineChart = null;
$("#chart1-btn").on("click", () => {
  // $('#myChart').show()
  // pieChart(ctx)

  $.ajax({
    type: "get",
    url: `http://localhost:8080/chart/location/${$("#selectedBatch").val()}`,
    // dataType: "jsonp",
    //   contentType: "application/json; charset=UTF-8",
    crossDomain: true,
    success: function (data) {
      let place = [];
      let total = [];
      if (data.places.length == 0) {
        place = ["No data"];
        total = [0.01];
      } else {
        place = data.places;
        total = data.total;
      }

      if (barChart) barChart.destroy();
      //VISITORS EVERY LOCATION PER YEAR
      //FOR PIE GRAPH
      data = {
        datasets: [
          {
            data: total
            //FOR THE DATA YOU CAN PUT HERE THE NUMBER OF VISITORS IN ONE LOCATION I.E (40 Visitors in Cebu)
          }
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        // YOU CAN PUT THE PLACES HERE AS LABELS
        labels: place
      };

      barChart = new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          plugins: {
            colorschemes: {
              scheme: "office.Solstice6"
            }
          },
          legend: {
            position: "bottom"
          },
          layout: {
            padding: {
              left: 40,
              right: 40,
              top: 20
            }
          }
        }
      });
      $("#myChart").show();
    }
  });
  console.log($("#selectedBatch").val());
});

$("#chart2-btn").on("click", () => {
  let fname = $("#firstname").val();
  let lname = $("#lastname").val();
  console.log(lname);
  $.ajax({
    type: "get",
    url: `http://localhost:8080/chart/perStudent/
        ${fname}/${lname}`,
    // dataType: "jsonp",
    //   contentType: "application/json; charset=UTF-8",
    crossDomain: true,
    success: function (data) {
      let date = [];
      let total = [];
      if (data.date.length == 0) {
        date = ["No data"];
        total = [0];
      } else {
        if (data.date.length == 1) {
          date = [data.date,data.date]
          total = [data.total,data.total];
        } else {
          date = data.date;
          total = data.total;
        }
      }

      //VISITORS OF A CERTAIN STUDENT PER YEAR
      //FOR LINE CHART
      var gradientStroke = ctx2.createLinearGradient(1200, 0, 100, 0);
      gradientStroke.addColorStop(0, "#ff5757");
      gradientStroke.addColorStop(1, "#578cff");

      if (lineChart) lineChart.destroy();

      lineChart = new Chart(ctx2, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: `${fname} ${lname}`,
              borderColor: gradientStroke,
              pointRadius: 0,
              fill: true,

              backgroundColor: gradientStroke,
              borderWidth: 1,
              data: total //I CAN PUT HERE THE N VISITORS OF A CERTAIN STUDENT EVERY YEAR AS ELEMENT
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: "bottom"
          },
          layout: {
            padding: {
              left: 40,
              right: 100,
              top: 20
            }
          }
        }
      });
      $("#myChart2").show();
    }
  });
});

Chart.defaults.global.defaultFontFamily = "Comfortaa";
Chart.defaults.global.defaultFontSize = 23;
