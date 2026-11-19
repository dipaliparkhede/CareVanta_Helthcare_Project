import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Lock } from 'lucide-react';

export default function ReportVerification() {
  const { code: paramCode } = useParams();
  const [code, setCode] = useState(paramCode || 'CV-VERIFY-HEALTH99');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (paramCode) verifyCode(paramCode);
  }, [paramCode]);

  const verifyCode = async (searchCode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get(`/medical-reports/verify/${searchCode}`);
      setResult(res.data.verificationDetails);
    } catch (err) {
      setError('Authenticity record not found. Please verify the code.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code) verifyCode(code);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#E8F7F3] text-[#18A999] rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">Medical Report Authenticity Verifier</h1>
        <p className="text-xs text-slate-500">
          Verify digital prescriptions, diagnostic pathology reports, and consultation summaries.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Verification Code (e.g. CV-VERIFY-HEALTH99)..."
            className="flex-1 px-4 py-3 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#18A999]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#18A999] text-white font-semibold text-xs rounded-xl"
          >
            {loading ? 'Verifying...' : 'Verify Authenticity'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="p-6 bg-[#E8F7F3]/50 border border-[#18A999]/30 rounded-2xl space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Official Authenticity Confirmed
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Report ID:</span>
                <span className="font-bold text-slate-800">{result.reportNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Report Type:</span>
                <span className="font-bold text-slate-800">{result.reportType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Issuing Authority:</span>
                <span className="font-bold text-slate-800">{result.issuingAuthority}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Issued Date:</span>
                <span className="font-bold text-slate-800">{new Date(result.issuedDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Patient Identity Masked:</span>
                <span className="font-bold text-slate-800">{result.patientInitials}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Cryptographic Seal:</span>
                <span className="font-bold text-emerald-700">{result.digitalSignStatus}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-200">
              In adherence to national data protection and healthcare privacy statutes, only verifiable metadata is revealed publicly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
