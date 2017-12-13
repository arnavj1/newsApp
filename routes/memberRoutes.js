
// include my user model for this application
var mongoModel = require("../models/users.js")

exports.init = function(app) {
  // app.js put the Passport object on the Express object so we could get it 
  // handily here.  Note that this form of app.get is NOT a route, rather it is
  // a getter to go along with a prior setter.
  var passport = app.get('passport');
  // Welcome page route
  app.all('/', index);
  /*
   * A route to display information only for members who are logged in
   * The first argument is the route pattern
   * The second argument is a middleware function to check if the user making
   *    the request has been authenticated.  If so, it will call the next
   *    middleware argument.  If not authenticated, it will res.render an eror.
   * The third argument is the middleware function to handle the membersOnly
   *    route.
   */

   //create new user
  app.put('/users/:first_name/:last_name/:email/:username/:password/:city', doCreate); // CRUD Create

  //when a member logs in
  app.get('/membersOnly',
          checkAuthentication,
          doMembersOnly);
  /*
   * A login route.
   * This route only uses the Passport middleware to authenticate the user.
   * It uses the 'local' authentication strategy (defined in 
   *    models/authentication.js).  Upon successful authentication, redirect
   *    the user to the /membersOnly route.  Upon failure to authenticate,
   *    redirect the user to the /login.html page.
   */
   
  app.post('/login',
          passport.authenticate('local', {
                                  failureRedirect: '/signup.html',
                                  successRedirect: '/membersOnly'}));
  // The Logout route
  app.get('/logout', doLogout);
}

// No path:  display the welcome page
index = function(req, res) {
  res.redirect('index.html');
};

// Members Only path handler
doMembersOnly = function(req, res) {
  // We only should get here if the user has logged in (authenticated) and
  // in this case req.user should be defined, but be careful anyway.
  if (req.user) {
    // Render the membership information view
    res.redirect('news.html');
  } else {
    // res.redirect('login.html')
    // Render an error if, for some reason, req.user.displayName was undefined 
    res.render('error', { 'message': 'Application error...' });
  }
};

/*
 * Check if the user has authenticated
 * @param req, res - as always...
 * @param {function} next - The next middleware to call.  This is a standard
 *    pattern for middleware; it should call the next() middleware component
 *    once it has completed its work.  Typically, the middleware you have
 *    been defining has made a response and has not needed any additional 
 *    middleware.
 */
function checkAuthentication(req, res, next){
    // Passport will set req.isAuthenticated
    if(req.isAuthenticated()){
        // call the next bit of middleware
        //    (as defined above this means doMembersOnly)
        next();
    }else{
        // The user is not logged in. Redirect to the login page.
        res.redirect("/index.html");
    }
}

doCreate = function(req, res){
  /*
   * First check if req.body has something to create.
   * Object.keys(req.body).length is a quick way to count to number of 
   * properties in the req.body.object.
   */
   // if (Object.keys.(req.body).length == 0) {
   //  res.render('message', {title: 'Mongo Demo', obj: 'No create message body found'});
   //  return;
   // }

   // Call the model Create with:
   // - The collection to do the Create into
   // - The object to add to the model, received as the body of the request
   // - An anonymous callback function to be called by the model once the 
   //   create has been successful. See below

  console.log(req.params.data);
  //create called with the collection, my object (req.body), and the callback function
  mongoModel.create ( 'users',
                        {first_name:req.params.first_name, last_name:req.params.last_name, email:req.params.email,
                        username:req.params.username, password:req.params.password, city:req.params.city},
                          function(result) {
                            // result equal to true means create was successful
                          var success = (result ? "Account Created! Log in using the link below!" : "Create unsuccessful");
                          //if the create is successful, then we send the success variable (true) that 
                          //will display "Create successful"
                          res.send(success);
                          // res.redirect("index.html");
                          });
}


/* 
 * Log out the user
 */
function doLogout(req, res){
  // Passport puts a logout method on req to use.
  req.logout();
  // Redirect the user to the welcome page which does not require
  // being authenticated.
  res.redirect('/');
};