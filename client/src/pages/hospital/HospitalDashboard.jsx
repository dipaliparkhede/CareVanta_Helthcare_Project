import React from 'react';
import { Building2, Activity, Users, Bed, CheckCircle2 } from 'lucide-react';

export default function HospitalDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-1">
        <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Hospital Administration</span>
        <h1 className="text-2xl font-bold text-white">CareVanta Dipali Parkhede Super Specialty Hospital</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-xs text-slate-400">Total Bed Capacity</span>
          <h3 className="text-3xl font-extrabold text-[#123B5D] mt-2">350</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-xs text-slate-400">Available General & ICU Beds</span>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">82</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-xs text-slate-400">Active Roster Doctors</span>
          <h3 className="text-3xl font-extrabold text-[#18A999] mt-2">48</h3>
        </div>
      </div>
    </div>
  );
}
