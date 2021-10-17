const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const http = require('http')
var createError = require('http-errors');
//const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const compression = require('compression');
const mongoose = require('mongoose');
const db = require('../config/index').get(process.env.NODE_ENV);
var passport = require('passport');
//websokets
const {Server} = require('socket.io')
const WebSockets = require('../utils/WebSockets')
const cors = require('cors')
var app = express();
app.use(cors())
app.use(compression());
// middlewares

//routes 
const indexRouter = require("../routes/index")
//const userRouter = require("../routes/user")
//const chatRoomRouter = require("../routes/chatRoom")
//const deleteRouter = require("../routes/delete")

app.use("/", indexRouter);
//app.use("/users", userRouter);
//app.use("/room", chatRoomRouter);
//app.use("/delete", deleteRouter);

//mongo connection
require("../config/mongo")
//set port
var port = db.PORT;

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist/css/'));
app.use(express.static('node_modules/bootstrap/dist/js/'));
app.use(express.static('node_modules/@popperjs/core/dist/cjs/'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('../node_modules/jquery-ui/ui/effects/'));
app.use(express.static('node_modules/hamburgers/dist'));
app.use(express.static('node_modules/@fortawesome/fontawesome-free/css/'));
app.use(express.static('node_modules/@fortawesome/fontawesome-free/webfonts/'));
app.use(express.static('node_modules/@fortawesome/fontawesome-free/js//'));
 // catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error!' });
});
/** Create HTTP server. */
const server = http.createServer(app);
//create socket conn
const socketio = new Server(server)
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
    /** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
//Start Server
server.on("listening", () => {
    console.log(`App listening on port::${port}`)
});

module.exports = app;