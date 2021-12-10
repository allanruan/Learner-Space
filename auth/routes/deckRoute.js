module.exports = function (app) {

    var decks = require('../controllers/deck.controller.js')

    app.post('/api/decks/deckowner', decks.findAll);

    app.get('/api/decks/:id', decks.findById);

    app.post('/api/decks', decks.addDeck);

    app.put('/api/decks/:id', decks.updateById);

    app.delete('/api/decks/:id', decks.removeById);

}