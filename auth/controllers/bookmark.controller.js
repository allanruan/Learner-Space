const Bookmark = require('../models/bookmark.js');


exports.findAll = (req, res) => {
    const { owner,name } = req.body;
    Bookmark.find({owner:req.body.owner})
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

exports.updateSourceById = (req, res) => {
    Bookmark.findOneAndUpdate({_id:req.params.id, source:{$elemMatch:{id:req.body._id}}},
        {$set:{'source.$.sourcename':req.body.sourcename,
               'source.$.sourceurl':req.body.sourceurl}},
        (err, bookmark) => {
        if (err) throw err;
        res.send(bookmark);
    })
}

exports.deleteSourceById = (req, res) => {
    Bookmark.findOneAndUpdate({_id:req.params.id},
        {$pull:{source:{_id:req.body._id}}},
        (err, bookmark) => {
        if (err) throw err;
        res.send(bookmark);
    })
}

exports.addSourceById = (req, res) => {
    Bookmark.findOneAndUpdate({_id:req.params.id},
        {$push:{source:req.body}},
        (err, bookmark) => {
        if (err) throw err;
        res.send(bookmark);
    })
}