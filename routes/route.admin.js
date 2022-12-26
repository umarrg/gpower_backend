const express = require('express');
const authorizer = require('../middlewares/middleware.authorizer').authorizer;

module.exports = () => {
    const api = express.Router();

    api.get('/killme', authorizer(['admin']), (req, res) => {
        res.status(200).json({ status: 'success', payload: null, message: 'Server dead' });
        process.exit(0);
    });

    return api;
}