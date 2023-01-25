const express = require('express');
const Controller = require('../dao/dao.user');
const { tokenMiddleware } = require('../middlewares/middleware.token');
const request = require('request');
const axios = require("axios");


module.exports = () => {
    const api = express.Router();

    api.post('/', async (req, res) => {
        try {
            const user = await Controller.addNewUser(req.body);
            res.status(200).json({ status: true, payload: user, message: 'User created successfully!' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: false, payload: null, message: err });
        }
    });

    api.post('/analyze', async (req, res) => {
        const { text } = req.body;
        try {

            const data = await reque(text)

            res.status(200).json({ status: true, payload: data, message: 'Fetched successfully!' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: false, payload: null, message: err });
        }
    });

    api.post('/getcon', async (req, res) => {
        const { url } = req.body;
        try {
            const data = await getContent(url)

            res.status(200).json({ status: true, payload: data, message: 'Fetched successfully!' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: false, payload: null, message: err });
        }
    });

    api.get('/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                const user = await Controller.getOne(id);
                res.status(200).json({ status: true, payload: user, message: 'user fetched Successfully!' });
            } catch (err) {
                res.status(500).json({ status: false, payload: null, message: err });
            }
        } else {
            res.status(404).json({ status: false, payload: null, message: 'error' });
        }
    });


    api.put('/:id', async (req, res) => {
        const id = req.params.id;
        const { username, email } = req.body;
        console.log("ssss", id)
        if (id) {
            try {
                const user = await Controller.update(id, username, email);
                res.status(200).json({ status: true, payload: user, message: 'user Updated Successfully!' });
            } catch (err) {
                res.status(500).json({ status: false, payload: null, message: err });
            }
        } else {
            res.status(500).json({ status: 'failure', payload: null, message: 'Invalid  id to Update' });
        }
    });

    api.delete('/:id', async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                await Controller.deleteUser(id);
                res.status(200).json({ status: true, payload: null, message: 'user Deleted Successfully!' });
            } catch (err) {
                res.status(500).json({ status: false, payload: null, message: err });
            }
        } else {
            res.status(404).json({ status: 'failed', payload: null, message: 'error' });
        }
    });



    api.delete('/', async (req, res) => {
        try {
            const users = await Controller.deleteAllUsers();
            res.status(200).json({ status: 'success', payload: users, message: 'users deleted successfully' });

        } catch (err) {
            res.status(404).json({ status: 'failed', payload: null, message: 'error' });
        }
    });

    api.get('/', tokenMiddleware(), async (req, res) => {
        try {
            const users = await Controller.getAllUsers();
            console.log(req.user)
            res.status(200).json({ status: true, payload: users, message: 'users fetched successfully' });

        } catch (err) {
            res.status(500).json({ status: false, payload: null, message: 'error' });
        }
    });


    return api;

}

async function reque(text) {
    headers = {
        'Content-tFype': 'application/json',
        'Authorization': 'Bearer 230F8094626F52211F6342DAD2FA20166F79AF3A5005C8349E0A46CF4C7E9228'
    };
    var dataString = {
        "text": text
    };

    return await axios.post("https://api.copyleaks.com/v2/writer-detector/my-custom-id/check", dataString, {
        headers
    }).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err);
        return err
    })



}


async function getContent(url) {
    let formdata = new URLSearchParams();
    formdata.append("action", "parse_html");
    formdata.append("inputs", url);
    formdata.append("token", "");

    return await axios.post("https://writer.com/wp-admin/admin-ajax.php", formdata,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err);
        return err
    })



}