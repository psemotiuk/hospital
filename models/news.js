const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String },
});

module.exports = model('News', schema);