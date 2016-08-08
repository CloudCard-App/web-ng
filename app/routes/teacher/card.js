let deckModel = require('../../models/teacher/deck');

module.exports.create = (req, res) => {
  deckModel.createCard(req.query.deckID, req.body.front, req.body.back, req.body.datatype).then(() => {
    console.log('created card deckID = ' + req.query.deckID);
    res.redirect('/teacher/deck/deck/?deckID=' + req.query.deckID);
    console.log('redirected!');
  }).catch((error) => {
    console.error('error creating card! ' + error);
  });
};

module.exports.delete = (req, res) => {
  deckModel.deleteCard(req.body.cardID).then(() => {
    res.redirect('/teacher/deck/deck/?deckID=' + req.body.deckID);
  }).catch((error) => {
    console.error('error deleting card! ' + error);
  });
};

module.exports.edit = (req, res) => {
  deckModel.editCard(req.body.cardID, req.body.front, req.body.back, req.body.datatype).then(() => {
    res.redirect('/teacher/deck/deck/?deckID=' + req.body.deckID);
  }).catch((error) => {
    console.error('error editing card! ' + error);
  });
};