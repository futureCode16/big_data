const mongoose = require('mongoose');
let models = require("./accountSchema");
let response = require("./helper");
const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function (account, res) {
    console.log(account)
    var insert = { accountName: account.accountName, password: account.password }
    var Account = new models.Accounts(insert)
    Account.save().then((doc) => {
        var token = jwt.sign({ id: doc.accountName }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ 'auth': true, 'token': token });
        res.end();
    })
        .catch(err => {

            res.status(500).send("There was a problem registering the account." + err)
        })
};