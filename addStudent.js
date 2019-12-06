const mongoose = require('mongoose');
let models = require("./schema");
let response = require("./helper")

module.exports = function(student, res) {
    console.log(student)
    var insert = { name: { firstname: student.name.firstname, lastname: student.name.lastname }, age: student.age, gender: student.gender, address: student.address }
    var Student = new models.Visitors(insert)
    Student.save().then(response => console.log(response)).catch(err => console.log(err))
};