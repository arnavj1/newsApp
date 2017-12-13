
//require mongodb
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

/*
 * This connection_string is for mongodb running locally.
 * Change nameofmydb to reflect the name you want for your database
 */

//this is the URI given by mLab to connect 
//edited from the source code given, because the env password variable isnt present
var connection_string = "mongodb://arnavj1:private@ds117316.mlab.com:17316/finalproject_users"

// Global variable of the connected database
var mongoDB;

// Use connect method to connect to the MongoDB server
mongoClient.connect(connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected to MongoDB server at: "+connection_string);
  mongoDB = db; // Make reference to db globally available.
});


// create a new user
exports.create = function(collection, data, callback) {
  // console.log(data);
  // Do an asynchronous insert into the given collection
  // console.log(data);
  mongoDB.collection(collection).insertOne(
    data,                     // the object to be inserted
    function(err, status) {   // callback upon completion
      if (err) doError(err);
      // use the callback function supplied by the controller to pass
      // back true if successful else false
      var success = (status.result.n == 1 ? true : false);
      callback(success);
    });
}

// //retrieve user
// exports.retrieve = function(collection, query, callback) {
//   /*
//    * The find sets up the cursor which you can iterate over and each
//    * iteration does the actual retrieve. toArray asynchronously retrieves the
//    * whole result set and returns an array.
//    */
//   mongoDB.collection(collection).find(query).toArray(function(err, docs) {
//     if (err) doError(err);
//     // docs are MongoDB documents, returned as an array of JavaScript objects
//     // Use the callback provided by the controller to send back the docs.
//     console.log(docs);
//     callback(docs);
//   });
// }
 
exports.findByUsername = function(username, callback) {
  //using docs as done in the exports.retrieve, finding by username
  mongoDB.collection("users").find({"username":username}).toArray(function(err, docs) {
    // console.log(docs);
    if(err) doError(err);
  /*
   * Err would be used if there was an error communicating with the database
   * This is different than not finding a User, which is a normal possibility
   * Since my example is just using an array, an error won't happen.
   * Your user information should be saved in a database.
   */
  var foundUser = null;
  var err = null;
  // search for the user with a given username
  for (var i = 0 ; i < docs.length ; i++) {
    if (docs[i].username == username) {
      foundUser = docs[i];
      break;
    }
  }
  /*
   * Call the given callback function with err and the foundUser
   * err may be null (no error connecting to database)
   * and foundUser also null if no user by this name is found
   */
  callback(err, foundUser);
});
}

/* 
 * Find a user given their id
 * @param {number} id - id to be searched for in the database
 * @param {function} callback - the function to call upon completion
 */
exports.findById = function(id, callback) {
  //using docs as done in the exports.retrieve, finding by username

  mongoDB.collection("users").find({"_id":ObjectId(id)}).toArray(function(err, docs) {
    console.log(docs);
    if(err) doError(err);
  /*
   * Err would be used if there was an error communicating with the database
   * This is different than not finding a User, which is a normal possibility
   * Since my example is just using an array, an error won't happen.
   * Your user information should be saved in a database.
   */
  var foundUser = null;
  var err = null;
  // search for the user with a given username
  for (var i = 0 ; i < docs.length ; i++) {
    if (docs[i]._id == id) {
      foundUser = docs[i];
      break;
    }
  }
  /*
   * Call the given callback function with err and the foundUser
   * err may be null (no error connecting to database)
   * and foundUser also null if no user by this name is found
   */
  callback(err, foundUser);
});
}
