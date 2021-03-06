let teacherDashboardRoutes = require('./routes/teacher/dashboard');
let teacherClassRoutes = require('./routes/teacher/class');
let teacherDeckRoutes = require('./routes/teacher/deck');
let teacherCardRoutes = require('./routes/teacher/card');

let studentDashboardRoutes = require('./routes/student/dashboard');
let studentEnrollRoutes = require('./routes/student/enroll');
let studentClassRoutes = require('./routes/student/class');
let studentDeckRoutes = require('./routes/student/deck');

module.exports = function (passport, app) {
  app.get('/', function (req, res) {
    console.log('req.query = ' + req.query.err);
    res.render('index', {error: req.query.err});
  });

  app.get('/auth/google/teacher', passport.authenticate('teacher', {scope: ['profile', 'email']}));

  app.get('/auth/google/student', passport.authenticate('student', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  }));

  app.get('/auth/google/callback/teacher', passport.authenticate('teacher', {
    successRedirect: '/teacher/dashboard',
    failureRedirect: '/?err=schoolNotRegistered',
  }));

  app.get('/auth/google/callback/student', passport.authenticate('student', {
    successRedirect: '/student/dashboard',
    failureRedirect: '/?err=schoolNotRegistered',
  }));

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- TEACHER -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  app.get('/teacher/dashboard', isLoggedIn, teacherDashboardRoutes.dashboard);

  app.post('/teacher/class/createClass', isLoggedIn, teacherClassRoutes.createClass);

  app.get('/teacher/class/class/*', isLoggedIn, teacherClassRoutes.class);

  app.post('/teacher/class/deleteClass', isLoggedIn, teacherClassRoutes.deleteClass);

  app.post('/teacher/deck/createDeck', isLoggedIn, teacherDeckRoutes.createDeck);

  app.get('/teacher/deck/deleteDeck/*', isLoggedIn, teacherDeckRoutes.deleteDeck);

  app.get('/teacher/deck/deck/*', isLoggedIn, teacherDeckRoutes.deck);

  app.post('/teacher/card/create/*', isLoggedIn, teacherCardRoutes.create);

  app.post('/teacher/card/deleteCard/', isLoggedIn, teacherCardRoutes.delete);

  app.post('/teacher/card/editCard/', isLoggedIn, teacherCardRoutes.edit);

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- STUDENT -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  app.get('/student/dashboard', isLoggedIn, studentDashboardRoutes.dashboard);

  app.get('/student/enroll/classesForTeacher/*', isLoggedIn, studentEnrollRoutes.classesForTeacher);

  app.post('/student/enroll/enroll/', isLoggedIn, studentEnrollRoutes.enroll);

  app.get('/student/class/class/*', isLoggedIn, studentClassRoutes.class);

  app.get('/student/deck/study/*', isLoggedIn, studentDeckRoutes.study);

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  // TODO: if you're logged in you can access any of the other (teacher vs. student) paths as well
  console.log('user = ' + req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log('not authenticated: redirecting to home');
    res.redirect('/');
  }
}