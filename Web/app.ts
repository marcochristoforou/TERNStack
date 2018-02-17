﻿import debug = require('debug');
import express = require('express');
import path = require('path');

import routes from './server/routes/index';
import user from './server/routes/user';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.engine('js', require('./server/engine'));
app.set('view engine', 'js');

app.use(express.static(path.join(__dirname, 'client/public')));

console.log("X="+__dirname);

app.use('/', routes);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
