'use strict';



console.log('Hello world');

var fs = require('fs');
var express = require('express');
var path = require('path');

var http = require('http');
var https = require('https');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./www/routes/index');




var app =   express() //.createServer(credentials);

// view engine setup
app.set('views', path.join(__dirname, 'www/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'www/public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

if (fs.existsSync('//home/debian/cert')) {
    var privateKey = fs.readFileSync('//home/debian/cert/private.key');
    var certificate = fs.readFileSync('//home/debian/cert/certificate.crt');

    var credentials = {key: privateKey, cert: certificate};
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443);
}
var httpServer = http.createServer(app);
httpServer.listen(80);


//var server = app.listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + server.address().port);
    //upgradeDb()
//});




