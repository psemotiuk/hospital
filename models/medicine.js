const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    img: { type: String },
    price: { type: Number },
    manufacturer: { type: String }
});

module.exports = model('Medicine', schema);