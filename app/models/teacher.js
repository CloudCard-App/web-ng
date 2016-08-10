let requester = require('./requester');

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

module.exports.deleteClass = function(classID) {
  let path = '/class/delete';
  let data = {
    form: {
      id: classID
    }
  };
  return requester.delete(path, data);
};