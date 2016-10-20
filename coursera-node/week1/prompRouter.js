// prompRouter.js //

// require all modules //
var express = require('express');
var bodyParser = require('body-parser');

// set express router and call body-parser //
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

// for all collection requests //
promoRouter.route('/')
.all(function(req,res,next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})

.get(function(req,res,next){
  res.end('Will send all the promotions to you!');
})

.post(function(req, res, next){
  res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
  res.end('Deleting all promotions');
});

// for collection requests with IDs //
promoRouter.route('/:id')
.all(function(req,res,next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  next();
})

.get(function(req,res,next){
  res.end('Will send details of the promotion: ' + req.params.id +' to you!');
})

.put(function(req, res, next){
  res.write('Updating the promotion: ' + req.params.id + '\n');
  res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
  res.end('Deleting promotion: ' + req.params.id);
});

// export module //
module.exports = promoRouter;