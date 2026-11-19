import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import {
  Users, Stethoscope, Building2, Pill, FlaskConical,
  CreditCard, ShieldAlert, CheckCircle2, TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    API.get('/admin/stats').then(res => setStats(res.data.stats)).catch(() => {});
    API.get('/admin/audit-logs').then(res => setAuditLogs(res.data.logs?.slice(0, 5) || [])).catch(() => {});
  }, []);

  const chartData = [
    { name: 'Mon', revenue: 14000, appointments: 18 },
    { name: 'Tue', revenue: 22000, appointments: 26 },
    { name: 'Wed', revenue: 18500, appointments: 21 },
    { name: 'Thu', revenue: 29000, appointments: 35 },
    { name: 'Fri', revenue: 34000, appointments: 42 },
    { name: 'Sat', revenue: 41000, appointments: 50 },
    { name: 'Sun', revenue: 26000, appointments: 30 }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-2">
        <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Super Administrator Console</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Ecosystem Command Center</h1>
        <p className="text-xs text-slate-300">
          System-wide oversight across Patients, Doctors, Hospitals, Pharmacies, Laboratories, and Financial Transactions.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-[11px] text-slate-400">Patients</span>
          <h4 className="text-xl font-bold text-[#123B5D] mt-1">{stats?.totalPatients || 120}</h4>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-[11px] text-slate-400">Doctors</span>
          <h4 className="text-xl font-bold text-[#18A999] mt-1">{stats?.totalDoctors || 45}</h4>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-[11px] text-slate-400">Pharmacies</span>
          <h4 className="text-xl font-bold text-[#247BA0] mt-1">{stats?.totalPharmacies || 12}</h4>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-[11px] text-slate-400">Diagnostics</span>
          <h4 className="text-xl font-bold text-teal-600 mt-1">{stats?.totalLaboratories || 8}</h4>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-[11px] text-slate-400">Appointments</span>
          <h4 className="text-xl font-bold text-[#123B5D] mt-1">{stats?.totalAppointments || 340}</h4>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow text-center">
          <span className="text-[11px] text-slate-400">Ecosystem Revenue</span>
          <h4 className="text-xl font-bold text-emerald-600 mt-1">Rs. {stats?.totalRevenue || '1,84,500'}</h4>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-4">
        <h3 className="font-bold text-base text-[#123B5D]">Weekly Transaction Volume & Appointments</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#18A999" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-3">
        <h3 className="font-bold text-sm text-[#123B5D]">Recent Security & Audit Events</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {auditLogs.map((log) => (
            <div key={log._id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#123B5D]">{log.action}</span>
                <span className="text-slate-400 ml-2">by {log.userEmail || 'System'}</span>
              </div>
              <span className="text-slate-400">{new Date(log.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
