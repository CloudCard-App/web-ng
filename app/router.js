let teacher = require('./models/teacher');

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
    teacher.getClassList(req.user._id).then((classes) => {
      console.log('rendering classes: ' + classes);
      res.render('teacher/dashboard', {
        'user': {
          'info': req.user,
          'classes': classes
        }
      });
    });
  });

  app.post('/teacher/createClass', isLoggedIn, (req, res) => {
    teacher.createClass(req.user._id, req.body.name, req.body.password).then((newClass) => {
      res.redirect('/teacher/dashboard');
    }).catch((error) => {
    });
  });

  app.get('/teacher/class/*', isLoggedIn, (req, res) => {
    let classID = req.query.id;
    console.log('classid = ' + classID);
    res.render('teacher/class', {
      className: 'Test Class', decks: [
        {name: 'Deck 1'},
        {name: 'Deck 2'},
        {name: 'Deck 3'},
        {name: 'Deck 4'},
        {name: 'Deck 5'},
        {name: 'Deck 6'},
        {name: 'Deck 7'}
      ]
    });
  });

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