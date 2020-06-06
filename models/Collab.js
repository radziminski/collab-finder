const mongoose = require('mongoose');
const { dawsList, genresList } = require('../devData/data');

const CollabSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        collaborators: {
            type: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    },
                    msg: {
                        type: String,
                    },
                },
            ],
            validate: [(val) => arrayMaxLimit(val, 10), 'Maximum number of colaborators is 10'],
        },
        requests: {
            type: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    },
                    msg: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        genres: {
            type: [
                {
                    type: [String],
                    enum: genresList,
                },
            ],
            validate: [(val) => arrayMinLimit(val, 1), 'The Collab should have at least 1 genre'],
        },
        daws: [
            {
                type: [String],
                enum: dawsList,
            },
        ],
        vsts: [
            {
                type: String,
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        status: {
            type: String,
            enum: ['searching', 'inprogress', 'finished'],
            default: 'searching',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {}
);

module.exports = mongoose.model('collab', CollabSchema);

const arrayMaxLimit = (arr, limit) => arr.length <= limit;
const arrayMinLimit = (arr, limit) => arr.length >= limit;
