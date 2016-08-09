let teacherModel = require('../../models/teacher');

module.exports.dashboard = (req, res) => {
  teacherModel.getClassList(req.user._id).then((classes) => {
    res.render('teacher/dashboard', {
      'user': {
        'info': req.user,
        'classes': classes
      }
    });
  });
};