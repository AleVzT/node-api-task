const { Schema, model } = require('mongoose');

const TaskSchema = Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
});

TaskSchema.method('toJSON', function() {
    const {__v, _id, ...object } = this.toObject();
    object.id= _id;
    return object;
});

module.exports = model('Tasks', TaskSchema);
