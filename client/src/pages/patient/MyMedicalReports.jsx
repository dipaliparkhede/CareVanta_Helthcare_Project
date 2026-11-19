import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import {
  FolderHeart, Download, Printer, Share2, ShieldCheck,
  Search, Eye, FileText, CheckCircle2, QrCode
} from 'lucide-react';

export default function MyMedicalReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [previewReport, setPreviewReport] = useState(null);

  const reportTypes = [
    'All',
    'Complete Blood Count (CBC) Report',
    'Doctor Consultation Report',
    'Digital Medical Prescription',
    'Diabetes (HbA1c) Report',
    'Thyroid Profile Report',
    'Lipid Profile Report',
    'Kidney Function Test (KFT) Report',
    'Liver Function Test (LFT) Report',
    'Hospital Discharge Summary'
  ];

  useEffect(() => {
    fetchReports();
  }, [selectedType]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      let url = '/medical-reports/my-reports';
      if (selectedType !== 'All') url += `?type=${encodeURIComponent(selectedType)}`;
      const res = await API.get(url);
      setReports(res.data.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Module 11</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Medical Reports Engine</h1>
          <p className="text-xs text-slate-300 mt-1">
            Download printable clinical documents, view biomarker test tables, and inspect QR verification certificates.
          </p>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {reportTypes.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedType === t ? 'bg-[#18A999] text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Reports Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 card-shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-xs">Loading verified clinical reports...</div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">No medical reports found under this category.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Report Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Issued Date</th>
                  <th className="px-6 py-4">Cryptographic Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((rep) => (
                  <tr key={rep._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#123B5D] text-sm">{rep.reportType}</div>
                      <div className="text-slate-400 text-[11px] font-mono">ID: {rep.reportNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {rep.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(rep.reportGenerationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold text-[10px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SHA-256 Validated
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setPreviewReport(rep)}
                        className="px-2.5 py-1.5 bg-[#E8F7F3] text-[#18A999] hover:bg-[#18A999] hover:text-white rounded-lg font-semibold transition-colors"
                        title="View Clinical Biomarkers"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" /> View
                      </button>
                      <button
                        onClick={() => handlePrint(rep.pdfUrl)}
                        className="px-2.5 py-1.5 bg-[#123B5D] text-white hover:bg-[#0c273e] rounded-lg font-semibold transition-colors"
                        title="Download Verified PDF"
                      >
                        <Download className="w-3.5 h-3.5 inline mr-1" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Report Biomarkers Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative border border-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-[#123B5D]">{previewReport.reportType}</h3>
                <p className="text-xs text-slate-400 font-mono">Official ID: {previewReport.reportNumber}</p>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Biomarker parameters table */}
            {previewReport.parameters && previewReport.parameters.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Evaluated Biomarkers</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#E8F7F3] text-[#123B5D] font-bold">
                      <tr>
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Result</th>
                        <th className="p-2.5">Units</th>
                        <th className="p-2.5">Interval</th>
                        <th className="p-2.5">Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {previewReport.parameters.map((p, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-medium">{p.parameterName}</td>
                          <td className="p-2.5 font-bold">{p.measuredValue}</td>
                          <td className="p-2.5 text-slate-500">{p.unit}</td>
                          <td className="p-2.5 text-slate-500">{p.referenceRange}</td>
                          <td className="p-2.5">
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              {p.interpretation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {previewReport.clinicalObservations && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <h4 className="font-bold text-[#123B5D]">Clinical Observations</h4>
                <p className="text-slate-600 leading-relaxed">{previewReport.clinicalObservations}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Link
                to={`/verify-report/${previewReport.verificationCode}`}
                className="text-xs text-[#18A999] font-bold flex items-center gap-1 hover:underline"
              >
                <QrCode className="w-4 h-4" /> View Cryptographic Verification Page
              </Link>
              <button
                onClick={() => handlePrint(previewReport.pdfUrl)}
                className="px-5 py-2.5 bg-[#123B5D] text-white text-xs font-semibold rounded-xl"
              >
                Download Official PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
