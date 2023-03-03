const mongoose = require('mongoose');
// model for crochet patterns
const dataSchema = new mongoose.Schema({
    nameOfPattern: {
        required: true,
        type: String
    },
    yarnWeight: {
        required: true, 
        type: String
    },
    hookSize: {
        required: true, 
        type: String
    },
    amtOfYarn: {
        required: false, 
        type: String
    },
    stitchType: {
        required: false, 
        type: String
    },
    rows: {
        required: false,
        type: Number
    }, 
    amtOfTime: {
        required: false, 
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema);