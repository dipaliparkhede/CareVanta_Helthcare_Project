import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Calendar, Video, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/my-appointments');
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await API.patch(`/appointments/${id}/status`, { status: 'Cancelled', cancellationReason: 'Cancelled by patient' });
      fetchAppointments();
    } catch (err) {
      alert('Cancellation failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">My Doctor Appointments</h1>
          <p className="text-xs text-slate-300">View upcoming teleconsultations, clinic visits, and join video rooms.</p>
        </div>
        <Link to="/doctors" className="px-4 py-2 bg-[#18A999] text-white text-xs font-semibold rounded-xl">
          Book New Doctor
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            No appointments booked yet.
          </div>
        ) : (
          appointments.map((apt) => (
            <div key={apt._id} className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#123B5D]">
                    Dr. {apt.doctor?.user?.firstName} {apt.doctor?.user?.lastName}
                  </h3>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                    {apt.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {apt.doctor?.specialization} • {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.timeSlot}
                </p>
                <p className="text-[11px] text-slate-400">Appointment #{apt.appointmentNumber} • Fee: Rs. {apt.consultationFee}</p>
              </div>

              <div className="flex items-center gap-3">
                {apt.status !== 'Cancelled' && (
                  <>
                    <Link
                      to="/patient/video-consultation"
                      className="px-4 py-2 bg-[#123B5D] hover:bg-[#18A999] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" /> Launch Video Call
                    </Link>
                    <button
                      onClick={() => handleCancel(apt._id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
