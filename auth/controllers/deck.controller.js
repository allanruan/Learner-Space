const Deck = require('../models/deck.js');


exports.findAll = (req, res) => {
    const { Owner,deckName } = req.body;
    Deck.find({Owner})
        .then(decks => {
            res.send(decks);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Deck.findById(req.params.id, (err, deck) => {
        if (err) throw err;
        res.send(deck);
    })
};

exports.addDeck = (req, res) => {
    const { _id, deckName,Owner } = req.body;

    Deck.findOne({ _id }, function (err, existingDeck) {
        if (err) {
          return res.status(422).json({ 'error': 'Oops! Something went Wrong' });
        }
        if (existingDeck) {
          return res.status(422).json({ 'error': 'Deck already exists' });
        }
        else {
        Deck.create(req.body, (err, data) => {
            if (err) { throw err; }
            res.send(data);
            });
        }
    })
}

exports.removeById = (req, res) => {
    Deck.findByIdAndRemove(req.params.id, (err, deck) => {
        if (err) throw err;
        res.send(deck);
    })
}

exports.updateById = (req, res) => {
    Deck.findByIdAndUpdate(req.params.id, req.body, (err, deck) => {
        if (err) throw err;
        res.send(deck);
    })
}