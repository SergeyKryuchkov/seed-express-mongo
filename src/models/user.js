const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
});

const User = mongoose.model('User', usersSchema);
module.exports = User;