const express = require('express');
const Controller = require('../dao/dao.user');

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

    api.get('/', async (req, res) => {
        try {
            const users = await Controller.getAllUsers();
            res.status(200).json({ status: true, payload: users, message: 'users fetched successfully' });

        } catch (err) {
            res.status(500).json({ status: false, payload: null, message: 'error' });
        }
    });


    return api;

}