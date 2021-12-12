module.exports = function (app) {

    var bookmarks = require('../controllers/bookmark.controller.js')

    app.post('/api/bookmarks/ownbookmarks', bookmarks.findAll);

    app.get('/api/bookmarks/:id', bookmarks.findById);

    app.post('/api/bookmarks', bookmarks.addBookmark);

    app.put('/api/bookmarks/:id', bookmarks.updateById);

    app.delete('/api/bookmarks/:id', bookmarks.removeById);

    app.put('/api/sources/:id', bookmarks.updateSourceById);

    app.put('/api/sources/delete/:id', bookmarks.deleteSourceById);

    app.put('/api/sources/add/:id', bookmarks.addSourceById);

}