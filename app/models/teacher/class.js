let request = require('request');
let requester = require('../requester');

module.exports.getDecks = function (classID) {
  let url = '/deck/list/?classID=' + classID.replace(/^"(.*)"$/, '$1'); // wtf
  return requester.get(url);
};

module.exports.getInfo = function (deckID) {
  let url = '/class/info/?classID=' + deckID.replace(/^"(.*)"$/, '$1'); // please
  return requester.get(url);
};

