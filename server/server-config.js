var express = require('express');
var app = express();
var partials = require('express-partials');
var mongoose = require('mongoose');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var Meal = require('./db/meals/meal');
var MealController = require('./db/meals/mealController');

var User = require('./db/users/user');
var UserController = require('./db/users/userController');

var q = require('q');
var jwt = require('jwt-simple');

var db = require('./db/dbconfig');// uncomment when this is ready

// TODO- add these modules later
// utils = require('./utils');
routes = require('../server-routes/routes');

var app = express();

// Middleware. Add below as needed

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));// this serves all the static assests in the /client folder
// app.use(express.cookieParser('shhhh, very secret'));// used for Auth uncomment when ready
app.use(session({secret: 'somesecret'})); // used for Auth

var checkUser = function (req,res,next) {
  var token = req.headers['x-access-token'];
  if(!token) {
    res.redirect('/signin');
  } else{
    next();
  }
};


app.post('/api/signin', UserController.signin);

app.get('/api/signin', UserController.signin);


app.get('/api/request', checkUser /*....*/);

app.post('/api/register', UserController.create)

app.get('/api/browse', MealController.allMeals) 

// app.post('/api/request', checkUser /*....*/);

// app.post('/api/view' /*....*/);

// app.get('api/view'/*....*/);
// // browse
// // This endpoint returns all the meals. TODO refactor

// //////////////new routes//////////////////////////////////
// // app.put('/api/makerequest', MealController.makeRequest);


// // app.put('/api/confirmrequest', MealController.confirmrequest);

// app.get('/api/viewpending', UserController.viewRequest);

// app.get('/api/viewuser',MealController.viewRequest);
// // //////////////////////////////////////////////////////

// // this endpoint returns all the meals objects form the db. TODO check with Jonathon to sync endpoint name 
// app.get('/api/browse', MealController.allMeals);


// // this endpoint puts a meal to the db
app.post('/api/create', checkUser, MealController.create);

// TODO: Inquire about logout routing -- if user wants to logout, end their session and send them to signin
app.get('/api/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
}); 

module.exports = app;