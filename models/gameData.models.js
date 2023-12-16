const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    achievements: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;
