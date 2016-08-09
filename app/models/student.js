let requester = require('./requester');
let classModel = require('./class');

module.exports.enroll = (studentID, classID, password) => {
  classModel.getInfo(classID).then((info) => {
    console.log('password = ' + password);
    console.log('correct password = ' + info.password);
    if (password === info.password) {
      let url = '/student/enroll';
      return requester.post(url, {
        form: {
          studentID: studentID,
          classID: classID
        }
      });
    } else {
      console.error('yowch!');
      // Do error handling
    }
  });
};