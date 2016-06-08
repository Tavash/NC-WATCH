var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.json');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', function (req, res) { return res.redirect('/api'); });
// API 
app.get('/api', function(req, res) { res.render('index', {'title' : config.name}); });
app.use('/api/analyzer', require('./routes/analyzer'));
app.use('/api/builtwith', require('./routes/builtwith'));
app.use('/api/whois', require('./routes/whois'));
app.use('/api/bluebox', require('./routes/bluebox'));
app.use('/api/googlesearch', require('./routes/googlesearch'));
app.use('/api/ssl', require('./routes/ssl'));


// Gestion CORS (permet d'autoriser ou refuser l acces à l'API en fonction de l'origine de la requete)
app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' == req.method)
        return res.send(200);
    next();
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', { message: err.message, error: {} });
});


// Start server
app.listen(config.serverPort, function () { console.log('Server listening at ' + config.apiUrl); });

module.exports = app;
