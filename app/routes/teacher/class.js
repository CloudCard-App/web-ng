let teacherModel = require('../../models/teacher');
let classModel = require('../../models/class');

module.exports.createClass = (req, res) => {
  teacherModel.createClass(req.user._id, req.body.name, req.body.password).then(() => {
    res.redirect('/teacher/dashboard');
  }).catch((error) => {
    console.error('Error creating new class: ' + error);
  });
};

module.exports.class = (req, res) => {
  let classID = req.query.classID;
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
};
