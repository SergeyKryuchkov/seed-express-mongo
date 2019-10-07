const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
    value: {
        type: String,
        minlength:1,
        maxlength:30,
    },
});

const Example = mongoose.model('Example', exampleSchema);
module.exports = Example;
