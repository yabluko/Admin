const rateLimit = require('express-rate-limit');
const logEvents = require('./logger.js');


const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
    max : 5,
    message : {message : "Too many login attempts from this IP ,try later"},
    handler : (req, res, next, options) => {
        logEvents(`Too many requests :${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log"),
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, 
	legacyHeaders: false, 
})

module.exports = loginLimiter;