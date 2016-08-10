let classModel = require('../../models/class');
let deckModel = require('../../models/deck');

module.exports.createDeck = (req, res) => {
  classModel.createDeck(req.query.classID, req.body.name, req.body.description).then(() => {
    res.redirect('/teacher/class/class/?id=' + req.query.classID);
  }).catch((error) => {
    console.log('error! ' + error);
  });
};

module.exports.deck = (req, res) => {
  let deckFind = deckModel.getInfo(req.query.deckID);
  let cardsFind = deckModel.getCards(req.query.deckID);

  Promise.all([deckFind, cardsFind]).then((results) => {
    let deckInfo = results[0];
    let cardList = results[1] || [];

    console.log('deckInfo = ' + JSON.stringify(deckInfo));
    console.log('cardList = ' + JSON.stringify(cardList));

    res.render('teacher/deck', {
      deckInfo: deckInfo,
      cardList: cardList,
      classInfo: deckInfo.class
    });
  });
};

module.exports.deleteDeck = (req, res) => {
  classModel.deleteDeck(req.query.deckID).then(() => {
    res.redirect('/teacher/class/class/?id=' + req.query.classID);
  });
};