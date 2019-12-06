var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var visitorOfStudent = new Schema({
    firstname: { type: String, required: true, unique: false },
    lastname: { type: String, required: true, unique: false },
    age: { type: Number, unique: false },
    gender: { type: String, unique: false },
    address: { type: String, unique: false },
    date: { type: String }
})

var visit = new Schema({
    name: {
        firstname: String,
        lastname: String
    },
    age: Number,
    gender: String,
    address: String,
    visitors: [visitorOfStudent]
}, {
    collection: 'visitors'
});

const Visitors = mongoose.model("Visitors", visit);
module.exports = { Visitors }