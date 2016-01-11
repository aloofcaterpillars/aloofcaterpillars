var mongoose = require('mongoose');
var Q = require('q'); 
//create mongoose database connection with name database


mongoose.connect('mongodb://localhost/greenfield');

//save connection in variable db
var db = mongoose.connection;

//set up listener for errors if unable to connect to server
db.on('error', console.error.bind(console, 'CONNECTION ERROR'));

//set up listener for success to know that connection was successful
db.once('open', function() {
  console.log('The database is connected'); 
}); 

//export db
module.exports = db;

