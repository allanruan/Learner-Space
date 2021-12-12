module.exports = function (app) {

    var cards = require('../controllers/card.controller.js')

    app.post('/api/cards/cardowner', cards.findAll);

    app.get('/api/cards/:id', cards.findById);

    app.post('/api/cards', cards.addCard);

    app.put('/api/cards/:id', cards.updateById);

    app.delete('/api/cards/:id', cards.removeById);

    app.delete('/api/cards/deck/:id', cards.removeByDeckId);

}