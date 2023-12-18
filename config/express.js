// Dependencies
var config = require('.');
var routes = require('./../routes/routes');
var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
const multer = require('multer')
var bodyParser = require('body-parser');
const subscribeToEvents = require('../eventSubscriber');


const logger = require('../logger/logger');

var initApp = function () {
  var app = express();

  subscribeToEvents();

  app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
  }))
   
  app.set('port', config.PORT);


app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

  app.use(morgan('combined',{ "stream": logger.stream }));
  
  app.set('views', './views');
  app.set('view engine', 'jade');
  app.use(express.static('./public'));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use(bodyParser.raw({type:'application/octet-stream', limit:'50mb'}));



  routes(app);

  return app;
};

module.exports = initApp;