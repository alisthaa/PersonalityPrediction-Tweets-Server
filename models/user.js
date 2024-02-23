const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of usernames
    },
    type: String,
    posts: String
});

module.exports = mongoose.model('User', userSchema);
