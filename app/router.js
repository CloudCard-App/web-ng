let classRoutes = require('./routes/teacher/class');
let deckRoutes = require('./routes/teacher/deck');
let cardRoutes = require('./routes/teacher/card');
let teacherDashboard = require('./routes/teacher/dashboard');

let studentDashboardRoutes = require('./routes/student/dashboard');
let studentEnrollRoutes = require('./routes/student/enroll');

module.exports = function (passport, app) {
  app.get('/', function (req, res) {
    res.render('index');
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
    failureRedirect: '/'
  }));

  app.get('/auth/google/callback/student', passport.authenticate('student', {
    successRedirect: '/student/dashboard',
    failureRedirect: '/'
  }));

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- TEACHER -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  app.get('/teacher/dashboard', isLoggedIn, teacherDashboard.dashboard);

  app.post('/teacher/class/createClass', isLoggedIn, classRoutes.createClass);

  app.get('/teacher/class/class/*', isLoggedIn, classRoutes.class);

  app.post('/teacher/deck/createDeck', isLoggedIn, deckRoutes.createDeck);

  app.get('/teacher/deck/deleteDeck/*', isLoggedIn, deckRoutes.deleteDeck);

  app.get('/teacher/deck/deck/*', isLoggedIn, deckRoutes.deck);

  app.post('/teacher/card/create/*', isLoggedIn, cardRoutes.create);

  app.post('/teacher/card/deleteCard/', isLoggedIn, cardRoutes.delete);

  app.post('/teacher/card/editCard/', isLoggedIn, cardRoutes.edit);

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- STUDENT -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  app.get('/student/dashboard', isLoggedIn, studentDashboardRoutes.dashboard);

  app.get('/student/enroll/classesForTeacher/*', isLoggedIn, studentEnrollRoutes.classesForTeacher);

  app.post('/student/enroll/enroll/', isLoggedIn, studentEnrollRoutes.enroll);

  app.get('/student/class/class', isLoggedIn, )

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  // TODO: if you're logged in you can access any of the other (teacher vs. student) paths as well
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}