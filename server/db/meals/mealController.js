var Q = require('q');
var db = require('../dbconfig.js');
var Meal = require('./meal.js');

//findone is the actual mongoose method, and it is being called on the Meal model provided as the second arg. 
var findMeal = Q.nbind(Meal.findOne, Meal);
// create meal is a method that uses the create mongoose method to instantiate a new Meal model
var createMeal = Q.nbind(Meal.create, Meal);
//method for showing all Meal instances
var findAllMeals = Q.nbind(Meal.find, Meal);

//export methods that utilize the Q methods above. 
module.exports = {
  //create method that takes req, res, and next
  create: function(req, res, next){
       createMeal({
		      picture: req.body.picture, 
  			  description: req.body.description,
  			  title: req.body.title,
  			  protein: req.body.protein,
  			  creator: req.body.creator,
  			  consumer: req.body.consumer,
          status: 'none'
		    }).then(function(){
          res.send(201,'success');
        });
  }, 

  allMeals: function(req, res, next) {
    console.log('You accessed all meals')
    findAllMeals({})
      .then(function(meals) {
        res.json(200, meals);
      })
      .fail(function(error) {
        next(error);
      });
  }, 

  find: function(req, res, next) {
    findMeal({creator: req.body.creator})
      .then(function(match) {
        if(match) {
          res.send(200, match);
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  //CURRENTLY WORKING PERFECTLY
  //given an object containing a user (the prospective consumer) and the meal being requested) 
  makeRequest: function(req, res, next) {
    //find the prospective meal according to the title of the meal instance provided
    findMeal({title: req.body.meal.title})
      .then(function(meal) {   
        // console.log(req.body.meal);  
        console.log(meal);   
        //update the meal status
        meal.status = 'pending';
        //add the consumer (username from the user instance input) to the meal's consumer array
        meal.consumers.push(req.body.user.username);
        //after updating the meal, it also needs to be saved/updated in the database
        meal.save(function(err){
            if (!err){
                console.log("updated!");
            } else {
                console.log(err);
            }
        });
        res.send(201, meal); 
      })
      .fail(function(error) {
        next(error);
      });
  },

  //given TWO meal instances, need to update the status to sold to confirm transaction
  confirmRequest: function(req, res, next) {
    //Need to find both meal instances instances in the database - start with the first 
    findMeal({title: req.body.meal1.title})
      .then(function(meal) {
        //update the status to be sold to confirm
        meal.status = 'sold';
        //clear consumers array
        meal.consumers = [];
        //add final consumer back to the consumers array
        meal.consumers.push(req.body.meal2.creator);
        meal.save(function(err){
            if (!err){
                console.log("updated meal1!");
                console.log(meal);
            } else {
                console.log(err);
            }
        });
      })
      .fail(function(error) {
        next(error);
      });
    findMeal({title: req.body.meal2.title})
      .then(function(meal) {
        //update the status to be sold to confirm
        meal.status = 'sold';
        //clear consumers array
        meal.consumers = [];
        //add final consumer back to the consumers array
        meal.consumers.push(req.body.meal1.creator);
        //save the updates in the database
        meal.save(function(err){
            if (!err){
                console.log("updated meal2!");
                console.log(meal);
            } else {
                console.log(err);
            }
        });
        res.send(201, 'both updated to sold');
      })
      .fail(function(error) {
        next(error);
      });
  },  

  //right now this works and gets here successfully. However, because it's a get request, req.body is going to be
  //and empty object (confirmed via test on postman). 
  viewPending: function(req, res, next) {
    //this is where the user can view all of their foods that have a pending status. query database for 
    //meals with pending status for this user
    findAllMeals({creator: req.body.username, status: 'pending'})
      .then(function(meals) {
        //send back the meals in json
        console.log(req.body);
        res.json(200, 'worked');
      })
      .fail(function(error) {
        next(error);
      })
  },

  //shows history of all sold meals with username provided
  viewHistory: function(req, res, next) {
    //function that shows all the meals for the username with the sold status
    findAllMeals({creator: req.body.username, status: 'sold'})
      .then(function(meals) {
        //send back the meals found by the query 
        res.json(200, meals);
      })
      .fail(function(error) {
        next(error);
      })
  },

  //view the consumers of a meal instance
  viewUsers: function(req, res, next) {
    //given a meal instance, find it in the database
    findMeal({title: req.body.title})
      .then(function(meal) {
        //send back that meal's consumers array in JSON format
        res.json(200, 'got here wooo'); 
      })
      .fail(function(error) {
        next(error);
      })
  } 
};


  