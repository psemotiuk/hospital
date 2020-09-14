const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    user: { type: Types.ObjectId, ref: 'User' },
    doctor: { type: Types.ObjectId, ref: 'Doctor' },
    symptoms: { type: String },
    dateOfVisit: { type: Date, default: Date.now },
    timeOfVisit: { type: String },
    status: { type: Boolean }
});

module.exports = model('Visits', schema);