const Card = require('../models/card.js');


exports.findAll = (req, res) => {
    const { _id, deck, owner, front, back } = req.body;
    Card.find({owner})
        .then(cards => {
            res.send(cards);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if (err) throw err;
        res.send(card);
    })
};

exports.addCard = (req, res) => {
    const { _id, deck, owner, front, back } = req.body;

    Card.findOne({ _id }, function (err, existingCard) {
        if (err) {
          return res.status(422).json({ 'error': 'Oops! Something went Wrong' });
        }
        if (existingCard) {
          return res.status(422).json({ 'error': 'Card already exists' });
        }
        else {
        Card.create(req.body, (err, data) => {
            if (err) { throw err; }
            res.send(data);
            });
        }
    })
}

exports.removeById = (req, res) => {
    Card.findByIdAndRemove(req.params.id, (err, card) => {
        if (err) throw err;
        res.send(card);
    })
}

exports.updateById = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, req.body, (err, card) => {
        if (err) throw err;
        res.send(card);
    })
}
