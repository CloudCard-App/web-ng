let teacherModel = require('./models/teacher/teacher');
let classModel = require('./models/teacher/class');

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

  app.post('/teacher/createClass', isLoggedIn, (req, res) => {
    teacherModel.createClass(req.user._id, req.body.name, req.body.password).then((newClass) => {
      res.redirect('/teacher/dashboard');
    }).catch((error) => {
    });
  });

  app.get('/teacher/class/*', isLoggedIn, (req, res) => {
    let classID = req.query.id;
    console.log('classID = ' + classID);
    let classInfo = classModel.getInfo(classID);
    let deckList = classModel.getDecks(classID);

    Promise.all([classInfo, deckList]).then((results) => {
      console.log('done! ' + results);
      let classInfo = results[0];
      let deckList = results[1];

      console.log('classInfo = ' + JSON.stringify(classInfo));
      console.log('deckList = ' + JSON.stringify(deckList));

      res.render('teacher/class', {
        classInfo: classInfo,
        deckList: deckList
      });
    }).catch((error) => {
      console.error('argh! :( ' + error);
    });
  });

  app.post('/teacher/class/createDeck', isLoggedIn, (req, res) => {
    classModel.createDeck(req.query.classID, req.body.name, req.body.description).then(() => {
      res.redirect('/teacher/class/?id=' + req.query.classID);
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