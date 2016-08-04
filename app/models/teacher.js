let request = require('request');

module.exports.getClassList = function (teacherID) {
  return new Promise((resolve, reject) => {
    request('http://localhost:8080/class/list/?teacherID=' + teacherID, function (error, response, body) {
      if (!error && response == 200) {
        resolve(body);
      }
    });
  });
};