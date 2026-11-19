const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  description: String,
  headOfDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  icon: String
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
