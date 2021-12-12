const Bookmark = require('../models/bookmark.js');


exports.findAll = (req, res) => {
    const { Owner,bookmarkName } = req.body;
    Bookmark.find({Owner})
        .then(bookmarks => {
            res.send(bookmarks);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Bookmark.findById(req.params.id, (err, bookmark) => {
        if (err) throw err;
        res.send(bookmark);
    })
};

exports.addBookmark = (req, res) => {
    const { _id,Owner, nodeName,source } = req.body;

    Bookmark.findOne({ _id }, function (err, existingBookmark) {
        if (err) {
          return res.status(422).json({ 'error': 'Oops! Something went Wrong' });
        }
        if (existingBookmark) {
          return res.status(422).json({ 'error': 'Bookmark already exists' });
        }
        else {
        Bookmark.create(req.body, (err, data) => {
            if (err) { throw err; }
            res.send(data);
            });
        }
    })
}

exports.removeById = (req, res) => {
    Bookmark.findByIdAndRemove(req.params.id, (err, bookmark) => {
        if (err) throw err;
        res.send(bookmark);
    })
}

exports.updateById = (req, res) => {
    Bookmark.findByIdAndUpdate(req.params.id, req.body, (err, bookmark) => {
        if (err) throw err;
        res.send(bookmark);
    })
}