let request = require('request');

module.exports.get = function (path) {
  return new Promise((resolve, reject) => {
    let url = process.env.CORE_URL + path;
    console.log('Sending request: ' + url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        if (body) {
          resolve(JSON.parse(body));
        } else {
          resolve(null);
        }
      } else {
        reject(error);
      }
    });
  });
};

module.exports.post = function (path, data) {
  return new Promise((resolve, reject) => {
    let url = process.env.CORE_URL + path;
    request.post(url, data, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });
};

module.exports.delete = function(path, data) {
  return new Promise((resolve, reject) => {
    let url = process.env.CORE_URL + path;
    request.delete(url, data, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve();
      } else {
        reject(error);
      }
    })
  })
};