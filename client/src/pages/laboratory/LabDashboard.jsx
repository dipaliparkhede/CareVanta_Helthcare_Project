import React, { useState } from 'react';
import API from '../../services/api';
import { FlaskConical, Upload, CheckCircle2, FileText } from 'lucide-react';

export default function LabDashboard() {
  const [reportType, setReportType] = useState('Complete Blood Count (CBC) Report');
  const [patientId, setPatientId] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    try {
      const sampleParams = [
        { parameterName: 'Hemoglobin', measuredValue: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', interpretation: 'Normal' },
        { parameterName: 'Total Leucocyte Count (TLC)', measuredValue: '6,800', unit: 'cells/cu.mm', referenceRange: '4,000 - 11,000', interpretation: 'Normal' },
        { parameterName: 'Platelet Count', measuredValue: '280,000', unit: '/cu.mm', referenceRange: '150,000 - 450,000', interpretation: 'Normal' }
      ];

      const res = await API.post('/medical-reports/generate', {
        reportType,
        parameters: sampleParams,
        clinicalObservations: 'Diagnostic analysis performed with automated flow cytometry and confirmed microscopically.'
      });

      setStatusMsg(`Official Report ${res.data.report?.reportNumber} published with QR code.`);
    } catch (err) {
      alert('Failed to generate report.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-1">
        <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Pathology Management</span>
        <h1 className="text-2xl font-bold text-white">Diagnostic Laboratory Portal</h1>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-4">
        <h3 className="font-bold text-sm text-[#123B5D]">Compile & Issue Official Lab PDF Report</h3>
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Select Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200"
            >
              <option value="Complete Blood Count (CBC) Report">Complete Blood Count (CBC) Report</option>
              <option value="Comprehensive Lipid Profile Test">Comprehensive Lipid Profile Test</option>
              <option value="Diabetes (HbA1c) Report">Diabetes (HbA1c) Report</option>
              <option value="Liver Function Test (LFT Profile)">Liver Function Test (LFT Profile)</option>
              <option value="Kidney Function Test (KFT Profile)">Kidney Function Test (KFT Profile)</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#18A999] hover:bg-[#128275] text-white text-xs font-semibold rounded-xl"
          >
            Publish Finalized PDF Report
          </button>
        </form>

        {statusMsg && (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-bold">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}
