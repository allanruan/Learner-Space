const Task = require('../models/task.js');


exports.findAll = (req, res) => {
    const { _id, owner,desc, deadline, priority, reward,status } = req.body;
    Task.find(req.body)
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err) throw err;
        res.send(task);
    })
};

exports.addTask = (req, res) => {
    const { _id, owner,desc, deadline, priority, reward } = req.body;

    Task.findOne({ _id }, function (err, existingTask) {
        if (err) {
          return res.status(422).json({ 'error': 'Oops! Something went Wrong' });
        }
        if (existingTask) {
          return res.status(422).json({ 'error': 'Task already exists' });
        }
        else {
        Task.create(req.body, (err, data) => {
            if (err) { throw err; }
            res.send(data);
            });
        }
    })
}

exports.removeById = (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, task) => {
        if (err) throw err;
        res.send(task);
    })
}

exports.updateById = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
        if (err) throw err;
        res.send(task);
    })
}
