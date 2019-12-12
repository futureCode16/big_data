var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
let SALT = 10
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


var account = new Schema({
    accountName: { type: String, required: true, unique: false },
    password: { type: String, required: true, unique: false }
})

account.pre('save', function (next) {
    var account = this;

    if (account.isModified('password')) {
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(account.password, salt, function (err, hash) {
                if (err) return next(err);
                account.password = hash;
                next();
            })
        })

    } else {
        next();
    }
})

const Accounts = mongoose.model("Accounts", account);
const Visitors = mongoose.model("Visitors", visit);
module.exports = { Visitors,Accounts }