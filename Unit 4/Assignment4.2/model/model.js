const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    position: {
        required: true,
        type: String
    },
    passingYards: {
        required: false,
        type: Number
    },
    passingTouchdowns: {
        required: false, 
        type: Number
    },
    rushingYards: {
        required: false,
        type: Number
    },
    rushingTouchdowns: {
        required: false, 
        type: Number
    },
    recievingYards: {
        required: false, 
        type: Number
    },
    recievingTouchdowns: {
        required: false,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema);