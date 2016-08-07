let request = require('request');

module.exports.getClassList = function (teacherID) {
    return new Promise((resolve, reject) => {
        request('http://localhost:8080/class/list/?teacherID=' + teacherID, function (error, response, body) {
            console.log('got response: ' + JSON.stringify(response));
            console.log('got error: ' + JSON.stringify(error));
            if (!error && response.statusCode === 200) {
                console.log('resolved with body ' + body);
                resolve(JSON.parse(body));
            } else {
                reject(error);
            }
        });
    });
};

module.exports.createClass = function (teacherID, className, classPass) {
    return new Promise((resolve, reject) => {
        console.log('name: ' + className);
        console.log('password: ' + classPass);
        console.log('teacherID: ' + teacherID);
        request.post('http://localhost:8080/class/create', {
            form: {
                name: className,
                password: classPass,
                teacherID: teacherID
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(JSON.parse(body));
            } else {
                reject(error);
            }
        });
    });
};