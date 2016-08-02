module.exports = function(passport, app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/auth/google/teacher', passport.authenticate('teacher', {scope: ['profile', 'email']}));

  app.get('/auth/google/student', passport.authenticate('student', {scope: ['profile', 'email']}));

  app.get('/auth/google/callback/teacher', passport.authenticate('teacher', {
    successRedirect: '/teacher/dashboard',
    failureRedirect: '/'
  }));

  app.get('/auth/google/callback/student', passport.authenticate('student', {
    successRedirect: '/student/dashboard',
    failureRedirect: '/'
  }));

  app.get('/teacher/dashboard', isLoggedIn, (req, res) => {
    res.render('teacher/dashboard');
  });

  app.get('/student/dashboard', isLoggedIn, (req, res) => {
    res.render('student/dashboard');
  });

/*
  app.get('/auth/whoareyou', (req, res) => {
    res.render('whoareyou');
  });

  app.post('auth/google/teacherLogin');

  app.get('/auth/google/callback/student', passport.authenticate('google', {
    successRedirect: '/student/profile',
    failureRedirect: '/'
  }));

  app.get('/teacher/profile', function (req, res) {
    res.render('teacher/profile');
  });
*/
};

function isLoggedIn(req, res, next) {
  // TODO: if you're logged in you can access any of the other (teacher vs. student) paths as well
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}