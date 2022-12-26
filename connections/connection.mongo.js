
const mongoose = require('mongoose');
const { host, port, username, password, database } = require('../configs').mongoDb;
require('dotenv').config();
module.exports = () => {
    let options = {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true
    };

    const db = mongoose.connection;
    db.on('connected', () => {
        console.log('Connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ', err);
    });

    db.on('disconnect', () => {
        console.log('Disconnected from mongodb');
    });

    mongoose.connect(process.env.MONGO_URL, options);
}