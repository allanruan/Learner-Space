const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CardSchema = mongoose.Schema({
    deck:String,
    owner:String,
    front:String,
    back:String,
});


module.exports = mongoose.model('Card', CardSchema);