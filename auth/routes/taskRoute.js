module.exports = function (app) {

    var tasks = require('../controllers/task.controller.js')

    app.post('/api/tasks/owntasks', tasks.findAll);

    app.get('/api/tasks/:id', tasks.findById);

    app.post('/api/tasks', tasks.addTask);

    app.put('/api/tasks/:id', tasks.updateById);

    app.delete('/api/tasks/:id', tasks.removeById);

}