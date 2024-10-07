const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    subscription: { type: String, required: true, enum: ['Basic', 'Prime', 'Elite'] }
}, { timestamps: true });

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;