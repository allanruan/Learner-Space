const Reward = require('../models/reward.js');


exports.findAll = (req, res) => {
    Reward.find(req.body)
        .then(rewards => {
            res.send(rewards);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Reward.findById(req.params.id, (err, reward) => {
        if (err) throw err;
        res.send(reward);
    })
};

exports.addReward = (req, res) => {
    const { _id, owner,desc, cost,status } = req.body;

    Reward.findOne({ _id }, function (err, existingReward) {
        if (err) {
          return res.status(422).json({ 'error': 'Oops! Something went Wrong' });
        }
        if (existingReward) {
          return res.status(422).json({ 'error': 'Reward already exists' });
        }
        else {
        Reward.create(req.body, (err, data) => {
            if (err) { throw err; }
            res.send(data);
            });
        }
    })
}

exports.removeById = (req, res) => {
    Reward.findByIdAndRemove(req.params.id, (err, reward) => {
        if (err) throw err;
        res.send(reward);
    })
}

exports.updateById = (req, res) => {
    Reward.findByIdAndUpdate(req.params.id, req.body, (err, reward) => {
        if (err) throw err;
        res.send(reward);
    })
}
