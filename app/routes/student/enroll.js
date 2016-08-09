let teacherModel = require('../../models/teacher');
let studentModel = require('../../models/student');

module.exports.classesForTeacher = (req, res) => {
  teacherModel.getClassList(req.query.teacherID).then((classes) => {
    res.send(classes);
  });
};

module.exports.enroll = (req, res) => {
  var studentID = req.user._id;
  var classID = req.body.classID;
  var password = req.body.password;

  console.log('studentID ' + studentID);
  console.log('classID ' + classID);
  console.log('password ' + password);
  studentModel.enroll(studentID, classID, password).then(() => {
    console.log('redirecting');
    res.redirect('/student/dashboard');
  }).catch((error) => {
    console.log('erroring');
    res.redirect('/student/dashboard/?wrongPassword=true');
  });
};