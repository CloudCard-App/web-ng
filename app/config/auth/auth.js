module.exports = {
  teacher: {
    'clientID': process.env.CC_TEACHER_CLIENT_ID,
    'clientSecret': process.env.CC_TEACHER_CLIENT_SECRET,
    'callbackURL': process.env.CC_TEACHER_CALLBACK_URL
  },
  student: {
    'clientID': process.env.CC_STUDENT_CLIENT_ID,
    'clientSecret': process.env.CC_STUDENT_CLIENT_SECRET,
    'callbackURL': process.env.CC_STUDENT_CALLBACK_URL
  }
};
