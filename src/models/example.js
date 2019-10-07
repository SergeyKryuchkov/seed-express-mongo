const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    value: {
        type: String,
        minlength:1,
        maxlength:30,
    },
});

module.exports = mongoose.model('Example', ExampleSchema);
