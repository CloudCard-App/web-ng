let schoolModel = require('../../models/school');
let teacherModel = require('../../models/teacher');

module.exports.dashboard = (req, res) => {
  schoolModel.getTeachers(req.user.school._id).then((teachers) => {
    let teacherID = teachers[0]._id || req.query.teacherID;
    teacherModel.getClassList(teacherID).then((classes) => {
      res.render('student/dashboard', {
        classList: req.user.classes,
        teacherList: teachers,
        teacherClassList: classes,
      });
    });
  });
};