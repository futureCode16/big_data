var express = require("express");
var router = express.Router();
var app = express();
var port = 8080;
var path = require("path");
var bodyParser = require("body-parser");
var http = require("http").Server(app);
var Delete = require("./delete");
var DeleteStudent = require("./deleteStudent");
var check = require("./check");
var add = require("./addVisitor");
var addStudent = require("./addStudent");
var retrieveAll = require("./all");
var retrieveAllStudent = require("./student");
var update = require("./update");
var updateStudent = require("./updateStudent");
var schema = require("./schema");
var piechart = require("./chart_modules/piechart");
var linechart = require("./chart_modules/linechart");
require("./db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));

app.get("/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));

});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.all("/index.html", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/checking", function (req, res) {
    check(req.query, res);
});

app.put("/add", function (req, res) {
    add(req.body.student, req.body.visitor, res);
});

app.post("/addStudent", function (req, res) {
    addStudent(req.body, res);
});

app.put("/update/:id", function (req, res) {
    update(req.params.id, req.body, res);
});

app.put("/updateStudent/:id", function (req, res) {
    updateStudent(req.params.id, req.body, res);
});

app.put("/deleteStudent/:id", function (req, res) {
    DeleteStudent(req.params.id, res);
});

app.get("/retrieve-all", function (req, res) {
    retrieveAll(req, res);
});

app.get("/retrieve-all-student", function (req, res) {
    retrieveAllStudent(req, res);
});

app.put("/delete/:id", (req, res) => {
    Delete(req.params.id, req.body.id, res);
});

app.get("/chart/location/:year", (req, res) => {
    console.log(req.params);
    piechart(req.params.year, res);
});

app.get("/chart/perStudent/:firstname/:lastname", (req, res) => {
    linechart(req, res);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/404.html"));
});

http.listen(port, function () {
    console.log("listening to port: " + port);
});