let requester = require('./requester');
let classModel = require('./class');

module.exports.enroll = (studentID, classID, password) => {
  return new Promise((resolve, reject) => {
    console.log('hello world from student');
    classModel.getInfo(classID).then((info) => {
      console.log('password = ' + password);
      console.log('correct password = ' + info.password);
      if (password === info.password) {
        console.log('passports match');
        let url = '/student/enroll';
        requester.post(url, {
          form: {
            studentID: studentID,
            classID: classID
          }
        }).then(() => {
          resolve();
        });
      } else {
        console.error('yowch!');
        reject();
        // Do error handling
      }
    });
  });
};

module.exports.getInfo = (studentID) => {
  let url = '/student/info/?id=' + studentID;
  return requester.get(url);
};