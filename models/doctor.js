const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    speciality: { type: String },
    img: { type: String },
    costPerSession: { type: Number }
});

module.exports = model('Doctor', schema);