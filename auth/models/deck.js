const mongoose = require('mongoose'), Schema = mongoose.Schema;

const DeckSchema = mongoose.Schema({
    deckname:String,
    Owner:String,
});


module.exports = mongoose.model('Deck', DeckSchema);