import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { FileText, Download, Printer, QrCode } from 'lucide-react';

export default function MyPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    API.get('/prescriptions/my-prescriptions').then(res => setPrescriptions(res.data.prescriptions || [])).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-1">
        <h1 className="text-2xl font-bold text-white">Digital Prescriptions</h1>
        <p className="text-xs text-slate-300">Authorized e-prescriptions issued by verified practitioners.</p>
      </div>

      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div key={rx._id} className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#123B5D]">Prescription #{rx.prescriptionNumber}</h3>
                <p className="text-xs text-slate-500">Issued by Dr. {rx.doctor?.user?.firstName} {rx.doctor?.user?.lastName} on {new Date(rx.date).toLocaleDateString()}</p>
                {rx.diagnosis && <p className="text-xs text-[#18A999] font-semibold mt-1">Diagnosis: {rx.diagnosis}</p>}
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Digitally Signed
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Prescribed Medicines</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#E8F7F3] text-[#123B5D] font-bold">
                    <tr>
                      <th className="p-2.5">Medicine Name</th>
                      <th className="p-2.5">Strength</th>
                      <th className="p-2.5">Dosage</th>
                      <th className="p-2.5">Frequency</th>
                      <th className="p-2.5">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rx.medicines?.map((m, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-slate-800">{m.name}</td>
                        <td className="p-2.5 text-slate-600">{m.strength}</td>
                        <td className="p-2.5 text-slate-600">{m.dosage}</td>
                        <td className="p-2.5 text-slate-600">{m.frequency}</td>
                        <td className="p-2.5 text-slate-500">{m.instructions || 'After food'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">Verification: {rx.verificationCode}</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#123B5D] text-white rounded-xl font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Prescription
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
