let deckModel = require('../../models/deck');
let entities = require('entities');

module.exports.study = (req, res) => {
  let deckID = req.query.deckID;

  let deckInfoQuery = deckModel.getInfo(deckID);
  let cardsQuery = deckModel.getCards(deckID);

  Promise.all([deckInfoQuery, cardsQuery]).then((results) => {
    let deckInfo = results[0];
    let cardListEncoded = results[1];

    let cardListDecoded = [];

    cardListEncoded.forEach((deck) => {

      let decodedFront = entities.decodeHTML(deck.front);
      let decodedBack = entities.decodeHTML(deck.back);
      console.log('decoded front ' + decodedFront);
      console.log('decoded back ' + decodedBack);
      cardListDecoded.push({
        front: decodedFront,
        back: decodedBack,
        datatype: deck.back
      });
    });

    res.render('student/study', {
      deckInfo: deckInfo,
      cardList: cardListDecoded,
      classInfo: deckInfo.class
    })
  })
};
