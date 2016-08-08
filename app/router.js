let teacherModel = require('./models/teacher/teacher');
let classModel = require('./models/teacher/class');
let deckModel = require('./models/teacher/deck');

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

  app.get('/teacher/class/class/*', isLoggedIn, (req, res) => {
    let classID = req.query.id;
    let classInfo = classModel.getInfo(classID);
    let deckList = classModel.getDecks(classID);

    Promise.all([classInfo, deckList]).then((results) => {
      console.log('done! ' + results);
      let classInfo = results[0];
      let deckList = results[1];

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
      res.redirect('/teacher/class/class/?id=' + req.query.classID);
    }).catch((error) => {
      console.log('error! ' + error);
    });
  });

  app.post('/teacher/card/create/*', isLoggedIn, (req, res) => {
    deckModel.createCard(req.query.deckID, req.body.front, req.body.back, req.body.datatype).then(() => {
      console.log('created card deckID = ' + req.query.deckID);
      res.redirect('/teacher/deck/deck/?deckID=' + req.query.deckID);
      console.log('redirected!');
    }).catch((error) => {
      console.error('error creating card! ' + error);
    })
  });

  app.post('/teacher/card/deleteCard/', isLoggedIn, (req, res) => {
    deckModel.deleteCard(req.body.cardID).then(() => {
      res.redirect('/teacher/deck/deck/?deckID=' + req.body.deckID);
    }).catch((error) => {
      console.error('error deleting card! ' + error);
    });
  });

  app.post('/teacher/card/editCard/', isLoggedIn, (req, res) => {
    deckModel.editCard(req.body.cardID, req.body.front, req.body.back, req.body.datatype).then(() => {
      res.redirect('/teacher/deck/deck/?deckID=' + req.body.deckID);
    }).catch((error) => {
      console.error('error editing card! ' + error);
    });
  });

  app.get('/teacher/deck/deck/*', isLoggedIn, (req, res) => {
    let deckFind = deckModel.getInfo(req.query.deckID);
    let cardsFind = deckModel.getCards(req.query.deckID);

    Promise.all([deckFind, cardsFind]).then((results) => {
      let deckInfo = results[0];
      let cardList = results[1] || [];

      console.log('deckInfo = ' + JSON.stringify(deckInfo));
      console.log('cardList = ' + JSON.stringify(cardList));

      res.render('teacher/deck', {
        deckInfo: deckInfo,
        cardList: cardList
      });
    });
  });

  app.post('/teacher/card/update/*', (req, res) => {
    console.log('req.body = ' + JSON.stringify(req.body));
  })

  app.get('/teacher/class/deleteDeck/*', isLoggedIn, (req, res) => {
    console.log('deleting deck: deckID = ' + req.query.deckID);
    console.log('deleting deck: classID = ' + req.query.classID);

    classModel.deleteDeck(req.query.deckID).then(() => {
      res.redirect('/teacher/class/class/?id=' + req.query.classID);
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