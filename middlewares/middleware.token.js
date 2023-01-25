const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../configs').webToken;

function tokenMiddleware() {
    return async (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            try {
                const validToken = await verifyTokenPromisified(token);
                
                 req.user = validToken;
                next();
            } catch (err) {
                console.log('valid token error >> ', err);
                res.status(401).json({ status: 'failure', payload: null, message: 'Invalid Token provided!' });
            }
        } else {
            res.status(401).json({ status: 'failure', payload: null, message: 'Token required!, supply one please.' });
        }
    }
}

function verifyTokenPromisified(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secretKey, (err, validToken) => {
            if (err) {
                reject(err);
            }
            resolve(validToken);
        })
    })
}

module.exports.tokenMiddleware = tokenMiddleware;