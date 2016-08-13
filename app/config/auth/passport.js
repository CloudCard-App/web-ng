let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //Get it from google
let request = require('request');
let authConfig = require('./auth');

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log('serializing user: ' + user);
    let userID = user._id;
    done(null, userID); //Do whatever is next with the user.id
  });

  // used to deserialize the user, finding based on id
  passport.deserializeUser(function (id, done) {
    request(process.env.CORE_URL + '/student/info/?id=' + id, function (error, response, body) {
      if (!error && response.statusCode == 200 && body) {
        console.log('deserialized student: ' + body);
        done(null, JSON.parse(body));
      } else {
        request(process.env.CORE_URL + '/teacher/info/?id=' + id, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('deserialized teacher: ' + body);
            done(null, JSON.parse(body));
          }
        });
      }
    });
  });

  passport.use('teacher', new GoogleStrategy({
      clientID: authConfig.teacher.clientID,
      clientSecret: authConfig.teacher.clientSecret,
      callbackURL: authConfig.teacher.callbackURL
    },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log('posting to register teacher!');
        request.post(process.env.CORE_URL + '/teacher/register', {
          form: {
            gid: profile.id,
            gtoken: token,
            gemail: profile.emails[0].value,
            gname: profile.displayName,
            gavatar: profile.profileUrl
          }
        }, function (error, response, body) {
          if (JSON.parse(body).error) { // School not found
            console.log('done with school not found');
            return done(null, false, body);
          } else {
            return done(null, JSON.parse(body));
          }
        });
      });
    }
  ));

  passport.use('student', new GoogleStrategy({
    clientID: authConfig.student.clientID,
    clientSecret: authConfig.student.clientSecret,
    callbackURL: authConfig.student.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log('posting to register student!');
      request.post(process.env.CORE_URL + '/student/register', {
        form: {
          gid: profile.id,
          gtoken: token,
          gemail: profile.emails[0].value,
          gname: profile.displayName,
          gavatar: profile.profileUrl
        }
      }, function (error, response, body) {
        console.log('new student: ' + body);
        if (JSON.parse(body).error) { // School not found
          console.log('done with school not found');
          return done(null, false, body);
        } else {
          return done(error, JSON.parse(body));
        }
      });
    });
  }));
};
