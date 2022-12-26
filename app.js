require('./connections/connection.mongo')();
const express = require('express');
const cors = require("cors");

const PORT = process.env.PORT || 9000


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: "GPOWER API"});
});

//Auth Route
const authRoute = require('./routes/route.auth')();
app.use('/api/v1/auth', authRoute);

//User Rooute
const userRoute = require('./routes/route.user')();
app.use('/api/v1/user', userRoute);

//Admin Route
const adminRoute = require('./routes/route.admin')();
app.use('/api/v1/admin', adminRoute);

app.listen(PORT, () => {
    console.log('User Microservice listening on port ' + PORT)
});

module.exports.app = app;