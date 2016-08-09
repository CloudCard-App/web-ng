let classModel = require('../../models/class');

module.exports.class = (req, res) => {
  let classID = req.query.classID;

  let deckListFind = classModel.getDecks(classID);
  let classInfoFind = classModel.getInfo(classID);

  Promise.all([deckListFind, classInfoFind]).then((results) => {
    let deckList = results[0];
    let classInfo = results[1];

    res.render('student/class', {
      deckList: deckList,
      classInfo: classInfo
    });
  });
};