let teacherModel = require('../../models/teacher');
let studentModel = require('../../models/student');

module.exports.classesForTeacher = (req, res) => {
  teacherModel.getClassList(req.query.teacherID).then((classes) => {
    res.send(classes);
  });
};

module.exports.enroll = (req, res) => {
  studentModel.enroll(req.body.studentID, req.body.classID, req.body.password).then(() => {
    res.redirect('/student/dashboard');
  });
};