const mongoose = require('mongoose'), Schema = mongoose.Schema;

const RewardSchema = mongoose.Schema({
    owner:String,
    desc:String,
    cost:Number,
    status:String //finished or in progress
});


module.exports = mongoose.model('Reward', RewardSchema);