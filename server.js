// Load required packages
var bodyParser = require('body-parser');
var authController = require('./auth');
var passport = require('passport');
var express = require('express');
var http = require('http');
var adminRouter = express.Router();
var app = express();


//set the port
var port = process.env.port || 8080;

//middleware to use for all requests that posts to the log
adminRouter.use(function(req,res,next){
    console.log('a new user visitor');
    next();
});

//the data that will be sent back as a json file in the body
function getReturnData(req) {
    var obj = {
        headers: req.headers != null ? req.headers : "no header",
        body: req.body != null ? req.body : "no body",
        query: req.query != null ? req.query : "no query",
        KEY: process.env.UNIQUE_KEY
    }

    return obj;
}

//requierd for the 'basic' authorization
app.use(passport.initialize());
app.use(passport.session());

//a router path that responds with an body object
adminRouter.get('/get',function(req,res){
 
    res = res.status(200);
    res.type('text/plain');
    
   var obj = getReturnData(req);
   res.send(obj);

});

//a router path that responds with an body object
adminRouter.post('/post',function(req,res){
     
    res = res.status(200);
    res.type('text/plain');
    
   var obj = getReturnData(req);
   res.send(obj);

});

//a router path that responds with an body object
adminRouter.put('/put',function(req,res){
    
    res = res.status(200);
    res.type('text/plain');
    
   var obj = getReturnData(req);
   res.send(obj);

});

//a router path that requiers authentication then responds with an body object
adminRouter.delete('/delete',authController.isAuthenticated, function (req,res){
    res = res.status(200);
    res.type('text/plain');
    
   var obj = getReturnData(req);
   res.send({'access granted': obj });
});

//a response for any invalid path or method made by the user
adminRouter.use('*', function (req, res, next) {
    res.status(404).send({message: "Invalid path or not supported method."});
    next();
});

//start the server
app.listen(port);
app.use('/api',adminRouter);

console.log('server created on port 8080');