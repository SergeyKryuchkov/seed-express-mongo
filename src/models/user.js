const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    uuid: {

    },
    name: {
        type: String,
        minlength:1,
        maxlength:30,
    },
    password: {
        type: String,
        minlength: 1,
        maxlength: 60,
    },
    role: {
        type: String,
        default: 'user'
    },
});

const User = mongoose.model('User', usersSchema);
module.exports = User;