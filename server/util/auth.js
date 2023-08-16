const jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = (req, res, next) => {
    //console.log('HEADER OWN PROPERTY', req)
    if (req.headers && req.headers.hasOwnProperty('authorization')) {
        try {
            //console.log('HEADERS', req.headers.authorization)
            req.user = jwt.verify(req.headers.authorization.split(' ')[1], config.JWT_SECRET);
            //console.log('verify', jwt.verify(req.headers.authorization.split(' ')[1], config.JWT_SECRET))
        } catch (err) {
            res.status(401).send({
                message: "You are not authorized for this operation."
            });
            return
        }
    } else {
        //console.log('NO PROPERTY')
        res.status(401).send({
            message: "You are not authorized for this operation."
        });
        return
    }
    next();
    return;
};