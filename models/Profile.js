const mongoose = require('mongoose');
const { dawsList, statusList } = require('../devData/data');

const ProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        company: {
            type: String,
        },
        website: {
            type: String,
        },
        location: {
            type: String,
        },
        status: {
            type: String,
            enum: statusList,
        },
        skills: {
            type: [String],
        },
        bio: {
            type: String,
        },
        daw: {
            type: String,
            enum: dawsList,
        },
        experiance: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
                company: {
                    type: String,
                    default: 'freelance',
                },
                location: {
                    type: String,
                    default: 'remote',
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                },
                degree: {
                    type: String,
                },
                fieldOfStudy: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        socials: {
            youtube: String,
            facebook: String,
            instagram: String,
            soundcloud: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {}
);

module.exports = mongoose.model('profile', ProfileSchema);
