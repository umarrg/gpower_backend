const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { secretKey, expiresIn } = require('../configs').webToken;
const UserDao = require('../dao/dao.user');

module.exports = () => {
    const api = express.Router();
    api.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            let user = await UserDao.getOneByEmail(email);
            let dbUserPass = user.password;
            let flag = await comparePasswordsPromisified(password, dbUserPass);
            if (flag) {
                user.password = '************';
                let token = await generateToken(user._id, user.userType);
                const payload = { user: user, access_token: token };
                res.status(200).json({ status: 'success', payload: payload, message: 'User Logged In successfully!' });
            } else {
                res.status(500).json({ status: 'failed', payload: null, message: 'Invalid username or password' });
            }
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    api.post('/register', async (req, res) => {
        try {
            const data = await UserDao.addNewUser(req.body);
            console.log(data)
            let token = await generateToken(data._id, data.userType);
            const payload = { user: data, access_token: token };
            res.status(200).json({ status: 'success', payload: payload, message: 'User created successfully!' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    return api;
}

function comparePasswordsPromisified(sent, existing) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(sent, existing, (err, same) => {
            if (err) {
                reject(err);
            }
            resolve(same);
        });
    });
}

function generateToken(userId, userType) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign({ userId: userId, userType: userType }, secretKey, { expiresIn }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}