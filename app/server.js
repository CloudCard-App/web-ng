global.__base = __dirname + '/';

// set up =====================================================================
// get all the tools we need
var express = require('express');
var app = express(); //Create our app, using our new superpowers

app.set('views', __base + 'views/');
app.use('/public', express.static(__base + 'public'));

var passport = require('passport');
var flash = require('connect-flash'); //Flash messages in session

var morgan = require('morgan'); //Logs HTTP requests
var cookieParser = require('cookie-parser'); //Parses cookie info
var bodyParser = require('body-parser'); //Parses HTTP PUT and POST bodies
var session = require('express-session'); //Sessions.

// Passport configuration and setup ===========================================
require('./config/auth/passport')(passport); // pass passport for configuration
// require('./config/studentPassport')(studentPassport);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating.

// signs sessions using this secret : required thing
app.use(session({secret: 'amalgamation'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require(__base + 'router.js')(passport, app);

app.listen(8090);
console.info('Listening on port 8090!');