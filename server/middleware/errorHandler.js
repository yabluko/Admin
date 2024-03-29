const {logEvents} = require('./logger');


const errorHandler = (req, res, err, next) => {
    logEvents(`${err.name} : ${err.message} ${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    console.log(err.stack);
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);
    res.json({message : err.message});
}
 

module.exports = errorHandler ;