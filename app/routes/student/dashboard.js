let schoolModel = require('../../models/school');
let teacherModel = require('../../models/teacher');

module.exports.dashboard = (req, res) => {
  schoolModel.getTeachers(req.user.school._id).then((teachers) => {
    let teacherID = teachers[0]._id || req.query.teacherID;
    teacherModel.getClassList(teacherID).then((classes) => {
      if (req.query.teacherID) {
        res.render('student/dashboard', {
          classList: req.user.classes,
          teacherList: teachers,
          teacherClassList: classes
        })
      } else {
        res.render('student/dashboard', {
          classList: req.user.classes,
          teacherList: teachers,
          teacherClassList: classes
        });
      }
    });
  });
};