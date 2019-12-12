// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs')
// let SALT = 10

// var account = new Schema({
//     accountName: { type: String, required: true, unique: false },
//     password: { type: String, required: true, unique: false }
// })

// account.pre('save', function (next) {
//     var account = this;

//     if (account.isModified('password')) {
//         bcrypt.genSalt(SALT, function (err, salt) {
//             if (err) return next(err);

//             bcrypt.hash(account.password, salt, function (err, hash) {
//                 if (err) return next(err);
//                 account.password = hash;
//                 next();
//             })
//         })

//     } else {
//         next();
//     }
// })

// const Accounts = mongoose.model("Accounts", account);
// module.exports = { Accounts }