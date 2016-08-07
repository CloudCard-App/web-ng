let requester = require('../requester');

module.exports.getInfo = function (deckID) {
  let url = '/deck/info/?deckID=' + deckID;
  return requester.get(url);
};