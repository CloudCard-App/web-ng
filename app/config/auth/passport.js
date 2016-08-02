let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //Get it from google
let request = require('request');
let authConfig = require('./auth');

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log('serializing user: ' + user);
    done(null, user); //Do whatever is next with the user.id
  });

  // used to deserialize the user, finding based on id
  passport.deserializeUser(function (id, done) {
    console.log('deserializing user!');
    request.get('http://localhost:8080/teacher/info/?id=' + id).on('response', function (response) {
      console.log('deserialized user: ' + response);
      done(null, response);
    });
  });

  passport.use('teacher', new GoogleStrategy({
      clientID: authConfig.teacher.clientID,
      clientSecret: authConfig.teacher.clientSecret,
      callbackURL: authConfig.teacher.callbackURL
    },
    function (token, refreshToken, profile, done) {
      // make the code asynchronous
      // userModel.findOne won't fire until we have all our data back from Google
      /*process.nextTick(function () {
       // try to find the user based on their google id
       User.findOne({'google.id': profile.id}, function (err, user) {
       if (err) //No Google user like that
       return done(err);

       if (user) {
       // if a user is found, log them in
       return done(null, user);
       } else {
       // if the user isn't in our database, create a new user
       var newUser = new User();

       // set all of the relevant information
       newUser.google.id = profile.id;
       newUser.google.token = token;
       newUser.google.name = profile.displayName;
       newUser.google.email = profile.emails[0].value; // pull the first email

       // save the user
       newUser.save(function (err) {
       if (err)
       throw err;
       return done(null, newUser);
       });
       }
       });
       });*/

      process.nextTick(function () {
        console.log('posting to register teacher!');
        request.post('http://localhost:8080/teacher/register', {
          form: {
            gid: profile.id,
            gtoken: token,
            gemail: profile.emails[0].value,
            gname: profile.displayName,
            gavatar: profile.profileUrl
          }
        }, function (error, response, body) {
          console.log('new teacher: ' + body);
          console.log('response: ' + response);
          return done(error, body);
        });
      });
    }));

  passport.use('student', new GoogleStrategy({
    clientID: authConfig.student.clientID,
    clientSecret: authConfig.student.clientSecret,
    callbackURL: authConfig.student.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log('posting to register student!');
      request.post('http://localhost:8080/student/register', {
        form: {
          gid: profile.id,
          gtoken: token,
          gemail: profile.emails[0].value,
          gname: profile.displayName,
          gavatar: profile.profileUrl
        }
      }, function (error, response, body) {
        console.log('new student: ' + body);
        console.log('response: ' + response);
        return done(error, body);
      });
    });
  }));

};

