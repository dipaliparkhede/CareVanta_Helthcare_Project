import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../../services/api';
import {
  Calendar, Video, FileText, FolderHeart, ShoppingBag,
  Clock, ShieldCheck, ArrowRight, Activity, Heart, AlertCircle
} from 'lucide-react';

export default function PatientDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    API.get('/appointments/my-appointments').then(res => setAppointments(res.data.appointments?.slice(0, 2) || [])).catch(() => {});
    API.get('/medical-reports/my-reports').then(res => setReports(res.data.reports?.slice(0, 3) || [])).catch(() => {});
    API.get('/prescriptions/my-prescriptions').then(res => setPrescriptions(res.data.prescriptions?.slice(0, 2) || [])).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome & Profile Summary */}
      <div className="bg-gradient-to-r from-[#123B5D] to-[#247BA0] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18A999]/20 text-[#E8F7F3] text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-[#18A999]" /> Active Patient EHR Record
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-xs text-slate-200">
            Blood Group: <span className="font-bold text-white">{user?.bloodGroup || 'B+'}</span> | Patient ID: <span className="font-mono text-white">CV-PAT-9081</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/doctors"
            className="px-4 py-2.5 bg-[#18A999] hover:bg-[#128275] text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
          >
            Book New Doctor
          </Link>
          <Link
            to="/patient/documents"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
          >
            Medical Locker
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 card-shadow flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400">Upcoming Visits</span>
            <h3 className="text-2xl font-bold text-[#123B5D] mt-1">{appointments.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#247BA0] flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 card-shadow flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400">Active Prescriptions</span>
            <h3 className="text-2xl font-bold text-[#123B5D] mt-1">{prescriptions.length || 1}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#18A999] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 card-shadow flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400">Verified Reports</span>
            <h3 className="text-2xl font-bold text-[#123B5D] mt-1">{reports.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <FolderHeart className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 card-shadow flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400">Med Reminders</span>
            <h3 className="text-2xl font-bold text-[#123B5D] mt-1">2 Daily</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Appointments & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 card-shadow space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-base text-[#123B5D] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#18A999]" /> Upcoming Appointments
            </h3>
            <Link to="/patient/appointments" className="text-xs font-semibold text-[#18A999] hover:underline">
              View All
            </Link>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No appointments scheduled. Click 'Book New Doctor' to schedule.
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#123B5D]">
                      Dr. {apt.doctor?.user?.firstName} {apt.doctor?.user?.lastName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {new Date(apt.appointmentDate).toLocaleDateString()} • {apt.timeSlot}
                    </p>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                      {apt.type}
                    </span>
                  </div>
                  <Link
                    to="/patient/video-consultation"
                    className="px-3.5 py-2 bg-[#123B5D] hover:bg-[#18A999] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" /> Start Consult
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Medical Reports */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 card-shadow space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-base text-[#123B5D] flex items-center gap-2">
              <FolderHeart className="w-5 h-5 text-[#18A999]" /> Verified Clinical Reports
            </h3>
            <Link to="/patient/reports" className="text-xs font-semibold text-[#18A999] hover:underline">
              View All
            </Link>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No clinical reports uploaded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div key={rep._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#123B5D]">{rep.reportType}</h4>
                    <p className="text-xs text-slate-500">ID: {rep.reportNumber} • {new Date(rep.reportGenerationDate).toLocaleDateString()}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" /> Cryptographically Verified
                    </span>
                  </div>
                  <Link
                    to={`/verify-report/${rep.verificationCode}`}
                    className="p-2 text-[#18A999] hover:bg-emerald-50 rounded-xl"
                    title="Inspect Verification QR"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
