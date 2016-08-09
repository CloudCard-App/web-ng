let requester = require('./requester');

module.exports.getTeachers = (schoolID) => {
  let url = '/teacher/list/?schoolID=' + schoolID;
  return requester.get(url);
};