module.exports = function (app) {

    var rewards = require('../controllers/reward.controller.js')

    app.post('/api/rewards/ownrewards', rewards.findAll);

    app.get('/api/rewards/:id', rewards.findById);

    app.post('/api/rewards', rewards.addReward);

    app.put('/api/rewards/:id', rewards.updateById);

    app.delete('/api/rewards/:id', rewards.removeById);

}
