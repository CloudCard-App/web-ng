let requester = require('./requester');

module.exports.getDecks = function (classID) {
  let url = '/deck/list/?classID=' + classID.replace(/^"(.*)"$/, '$1'); // wtf
  return requester.get(url);
};

module.exports.getInfo = function (classID) {
  console.log('classID = ' + classID);
  let url = '/class/info/?classID=' + classID.replace(/^"(.*)"$/, '$1'); // please
  return requester.get(url);
};

module.exports.createDeck = function (classID, deckName, deckDescription) {
  let url = '/deck/create';
  let body = {
    form: {
      classID: classID,
      name: deckName,
      description: deckDescription
    }
  };
  return requester.post(url, body);
};

module.exports.deleteDeck = function (deckID) {
  console.log('deleting deckID = ' + deckID);
  let url = '/deck/delete';
  let body = {
    form: {
      deckID: deckID
    }
  };
  return requester.delete(url, body);
};