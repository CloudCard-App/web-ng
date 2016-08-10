let deckModel = require('../../models/deck');

module.exports.study = (req, res) => {
  let deckID = req.query.deckID;

  let deckInfoQuery = deckModel.getInfo(deckID);
  let cardsQuery = deckModel.getCards(deckID);

  Promise.all([deckInfoQuery, cardsQuery]).then((results) => {
    let deckInfo = results[0];
    let cardList = results[1];

    res.render('student/study', {
      deckInfo: deckInfo,
      cardList: cardList,
      classInfo: deckInfo.class
    })
  })
};
