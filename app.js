var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
var proxy = require('http-proxy-middleware');

var app = express();


MIDDLEWARE_URL = "http://middleware:56572"
var options = {
  target: MIDDLEWARE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
};
app.use('/api', proxy(options));


app.use(compression());

app.use(express.static(path.join(__dirname, 'dist')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    error: err
  });
});

module.exports = app;
