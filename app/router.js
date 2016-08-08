let teacherModel = require('./models/teacher/teacher');

let classRoutes = require('./routes/teacher/class');
let deckRoutes = require('./routes/teacher/deck');
let cardRoutes = require('./routes/teacher/card');

module.exports = function (passport, app) {
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
    teacherModel.getClassList(req.user._id).then((classes) => {
      res.render('teacher/dashboard', {
        'user': {
          'info': req.user,
          'classes': classes
        }
      });
    });
  });

  app.post('/teacher/class/createClass', isLoggedIn, classRoutes.createClass);

  app.get('/teacher/class/class/*', isLoggedIn, classRoutes.class);

  app.post('/teacher/deck/createDeck', isLoggedIn, deckRoutes.createDeck);

  app.get('/teacher/deck/deleteDeck/*', isLoggedIn, deckRoutes.deleteDeck);

  app.get('/teacher/deck/deck/*', isLoggedIn, deckRoutes.deck);

  app.post('/teacher/card/create/*', isLoggedIn, cardRoutes.create);

  app.post('/teacher/card/deleteCard/', isLoggedIn, cardRoutes.delete);

  app.post('/teacher/card/editCard/', isLoggedIn, cardRoutes.edit);

  app.get('/student/dashboard', isLoggedIn, (req, res) => {
    res.render('student/dashboard', {user: req.user});
  });

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