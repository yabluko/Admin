require('dotenv').config();
const express = require('express');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const app = express();
const PORT = process.env.PORT || 3500;


connectDB();

app.use(logger);
 
app.use(cors(corsOptions)); 

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname , 'public')));

app.use('/',  require('./routes/root' )); 

app.use('/users', require('./routes/userRoutes'));

app.use('/notes', require('./routes/notesRoutes'));

app.use('/auth', require('./routes/authRoutes'));

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if (req.accepts('json')){
        res.json({'message' : "Not found"});
    }else{
        res.type('txt').send('404 Not found')
    }
})


app.use(errorHandler);


mongoose.connection.once('open' , () => {
    console.log('Connected to MongoDB');
    app.listen(PORT , (err) => {
        err ? console.log(err) : console.log('Connected to server');
    })
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(`${err.no} : ${err.code} \t${err.syscall}\t
    ${err.hostname}\t`, 'mongoErrLog.log');
})