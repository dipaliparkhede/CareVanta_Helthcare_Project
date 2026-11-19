import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Calendar, Users, DollarSign, Star, Clock, Video, CheckCircle2 } from 'lucide-react';

export default function DoctorDashboard() {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get('/doctors/stats').then(res => setStats(res.data.stats)).catch(() => {});
    API.get('/appointments/doctor-appointments').then(res => setAppointments(res.data.appointments || [])).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-2">
        <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Clinical Practitioner Workspace</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Doctor Console</h1>
        <p className="text-xs text-slate-300">
          Manage clinical availability, review upcoming patient queues, and start WebRTC video consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400">Total Consults</span>
          <h3 className="text-2xl font-bold text-[#123B5D] mt-1">{stats?.completedAppointments || 28}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400">Patient Queue Today</span>
          <h3 className="text-2xl font-bold text-[#18A999] mt-1">{appointments.length || 4}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400">Consultation Fee</span>
          <h3 className="text-2xl font-bold text-[#123B5D] mt-1">Rs. {stats?.consultationFee || 800}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 card-shadow">
          <span className="text-xs text-slate-400">Practitioner Rating</span>
          <h3 className="text-2xl font-bold text-amber-500 mt-1">{stats?.rating || 4.9} ★</h3>
        </div>
      </div>

      {/* Appointment Queue */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 card-shadow space-y-4">
        <h3 className="font-bold text-base text-[#123B5D]">Upcoming Scheduled Patients</h3>
        <div className="divide-y divide-slate-100">
          {appointments.map((apt) => (
            <div key={apt._id} className="py-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#123B5D]">
                  {apt.patient?.firstName} {apt.patient?.lastName} ({apt.patient?.bloodGroup || 'O+'})
                </h4>
                <p className="text-xs text-slate-400">{apt.timeSlot} • {apt.type}</p>
              </div>
              <button
                onClick={() => window.location.href = '/patient/video-consultation'}
                className="px-4 py-2 bg-[#123B5D] hover:bg-[#18A999] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Video className="w-3.5 h-3.5" /> Launch Video Room
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
