const express = require('express');
const Controller = require('../dao/dao.user');
const { tokenMiddleware } = require('../middlewares/middleware.token');
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);



module.exports = () => {
    const api = express.Router();

    api.post('/airtime',  async (req, res) => {
        try {
            const payload={
                "country": "NG",
                "customer": "+2347016505825",
                "amount": 100,
                "recurrence": "ONCE",
                "type": "AIRTIME",
                "reference": "930rwrwr0049404444"
             }
            
            const response = await flw.Bills.create_bill(payload)
            res.status(200).json({ status: true, payload: response, message: 'successfully!' });
        } catch (err) {
            res.status(500).json({ status: false, payload: null, message: err });
        }
    });

   


    api.post('/', tokenMiddleware(), async (req, res) => {
        try {
            const payload = {
            
                "country":"NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
                
            }
            const response = await flw.Bank.country(payload)
            res.status(200).json({ status: true, payload: response, message: 'Fetch All subs' });

        } catch (err) {
            res.status(500).json({ status: false, payload: null, message: 'error' });
        }
    });


    return api;

}