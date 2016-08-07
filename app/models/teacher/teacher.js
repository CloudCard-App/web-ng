let request = require('request');
let requester = require('../requester');

module.exports.getClassList = function (teacherID) {
  let path = '/class/list/?teacherID=' + teacherID;
  return requester.get(path);
};

module.exports.createClass = function (teacherID, className, classPass) {
  let path = '/class/create';
  let data = {
    form: {
      name: className,
      password: classPass,
      teacherID: teacherID
    }
  };
  return requester.post(path, data);
};