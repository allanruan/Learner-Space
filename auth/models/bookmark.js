const mongoose = require('mongoose'), Schema = mongoose.Schema;

const BookmarkSchema = mongoose.Schema({
    name:String,
    owner:String,
    source:[{sourcename:String,sourceurl:String}]
});


module.exports = mongoose.model('Bookmark', BookmarkSchema);