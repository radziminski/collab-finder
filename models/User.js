const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    {}
);

UserSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

module.exports = mongoose.model('user', UserSchema);
