const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    surname: { type: String },
    adress: { type: String },
    phoneNumber: { type: String }
});

module.exports = model('User', schema);