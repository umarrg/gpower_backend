function authorizer(expectedUsertypeArr) {
    return (req, res, next) => {
        if (expectedUsertypeArr.includes(req.userAuth.userType)) {
            next();
        }
        else {
            res.status(401).json({ status: 'failure', payload: null, message: 'You are not authorise to carryout this operation' });
        }
    }
}
module.exports.authorizer = authorizer;