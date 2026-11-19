const mongoose = require('mongoose');

const reportTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true, unique: true },
  reportType: { type: String, required: true },
  defaultParameters: [{
    parameterName: String,
    unit: String,
    referenceRange: String
  }],
  headerText: String,
  footerDisclaimer: String
}, { timestamps: true });

module.exports = mongoose.model('ReportTemplate', reportTemplateSchema);
