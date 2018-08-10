const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
    // _id: {
    //     type: Schema.Types.ObjectId,
    // },
    value: {
        type: String,
        minlength:1,
        maxlength:30,
    },
});

const Example = mongoose.model('Example', exampleSchema);
module.exports = Example;
