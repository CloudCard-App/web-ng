let requester = require('./requester');

module.exports.getInfo = function (deckID) {
  let url = '/deck/info/?deckID=' + deckID;
  return requester.get(url);
};

module.exports.getCards = function (deckID) {
  let url = '/card/list/?deckID=' + deckID;
  return requester.get(url);
};

module.exports.createCard = function (deckID, cardFront, cardBack, dataType) {
  let url = '/card/create/';
  return requester.post(url, {
    form: {
      deckID: deckID,
      front: cardFront,
      back: cardBack,
      dataType: dataType
    }
  });
};

module.exports.deleteCard = function (cardID) {
  let url = '/card/delete/';
  return requester.delete(url, {
    form: {
      cardID: cardID
    }
  });
};

module.exports.editCard = function(cardID, front, back, datatype) {
  let url = '/card/update';
  return requester.post(url, {
    form: {
      cardID: cardID,
      front: front,
      back: back,
      datatype: datatype
    }
  })
};