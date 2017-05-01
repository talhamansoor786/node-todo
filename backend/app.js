var express		= require('express');
var app			= express();
var mysql		= require('mysql');
var config		= require('./config/index.js');
var bodyParser	= require('body-parser');
var register	= require('./controllers/registrationController.js');
var port		= process.env.port || 3000;

var conn		= mysql.createConnection(config);

register(app, conn);

app.listen(port);