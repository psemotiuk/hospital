const {Schema, model, Types, Mongoose} = require('mongoose');
// const Patient = require('./patient')
// const Doctor = require('./doctor')

const schema = new Schema ({
    patient: {type: Schema.Types.ObjectId, ref: 'Patient'},
    doctor: {type: Schema.Types.ObjectId, ref: 'Doctor'},
    disease: {type: String},
    beginOfTreatment: {type: Date},
    status: {type: Boolean},
    endOfTreatment: {type: Date}
});

module.exports = model('PatientCard', schema);
