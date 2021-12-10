const mongoose = require('mongoose'), Schema = mongoose.Schema;

const TaskSchema = mongoose.Schema({
    owner:String,
    desc:String,
    deadline:Date,
    priority:Number,
    reward:Number,
    status:String //finished or in progress
});


module.exports = mongoose.model('Task', TaskSchema);