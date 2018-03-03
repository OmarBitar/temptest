// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

//validate the the username and password
passport.use(new BasicStrategy(
    function(username, password, done) {
        //hard coded username and password
        var user = { name: "omar", password: "p@assw0rd" };
        if (username == user.name && password == user.password)
        {
            return done(null, user);
        }
        else
        {
            return done(null, false);
        }
    }
));

//exprot the result
exports.isAuthenticated = passport.authenticate('basic', { session : false });