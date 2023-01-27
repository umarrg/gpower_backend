const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, },
    fname: { type: String, },
    lname: { type: String, },
    userType: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

User.pre('save', function (next) {
    let me = this;
    const salt = bcrypt.genSaltSync();
    bcrypt.hash(me.password, salt, (err, encrypted) => {
        if (err) {
            console.log("Bcrypt User Model Password encryption Error", err);
            next();
        } else {
            me.password = encrypted;
            next();
        }
    });
});


module.exports = mongoose.model('cleerusers', User);