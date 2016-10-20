//server.js//

// require all modules //
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dishRouter = require('./dishRouter.js');
var dishRouter = require('./promoRouter.js');
var dishRouter = require('./leaderRouter.js');

//set host variables //
var hostname = 'localhost';
var port = 3000;

// declare express variable //
var app = express();

// use morgan dev logging //
app.use(morgan('dev'));

//  routing collections
app.use('/dishes',dishRouter);
app.use('/leaders',dishRouter);
app.use('/promotions',dishRouter);

// for serving static files through express
app.use(express.static(__dirname + '/public'));

// start server //
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});