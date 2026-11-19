import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import API from '../../services/api';
import { Stethoscope, Star, MapPin, Search, Filter, Calendar, Award, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function FindDoctors() {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialty, setSpecialty] = useState(searchParams.get('specialization') || 'All');
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlot, setBookingSlot] = useState('10:00 AM');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDoctors();
  }, [specialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      let url = '/doctors?limit=20';
      if (specialty && specialty !== 'All') url += `&specialization=${encodeURIComponent(specialty)}`;
      const res = await API.get(url);
      setDoctors(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!bookingDoctor) return;
    try {
      const res = await API.post('/appointments/book', {
        doctorId: bookingDoctor._id,
        appointmentDate: bookingDate || new Date().toISOString(),
        timeSlot: bookingSlot,
        type: 'Video Consultation'
      });
      setBookingSuccess(res.data.appointment);
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed. Please ensure you are logged in.');
    }
  };

  const specialtiesList = [
    { key: 'All', label: t('viewAll') },
    { key: 'Cardiologist', label: t('cardiology') },
    { key: 'Neurologist', label: t('neurology') },
    { key: 'General Physician', label: t('generalMedicine') },
    { key: 'Pediatrician', label: t('pediatrics') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header banner */}
      <div className="bg-[#123B5D] text-white p-8 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('featuredDoctorsBadge')}</span>
        <h1 className="text-3xl font-extrabold text-white">{t('findDoctors')}</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {specialtiesList.map((s) => (
            <button
              key={s.key}
              onClick={() => setSpecialty(s.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                specialty === s.key 
                  ? 'bg-[#18A999] text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 font-medium">Loading certified medical specialists...</div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No doctors match this filter</h3>
          <p className="text-xs text-slate-400 mt-1">Try selecting 'All' or removing search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc._id} className="bg-white rounded-2xl border border-slate-100 card-shadow p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={doc.user?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400'}
                    alt={doc.user?.firstName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#18A999] shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#123B5D]">
                      Dr. {doc.user?.firstName} {doc.user?.lastName}
                    </h3>
                    <p className="text-xs font-semibold text-[#18A999]">{doc.specialization}</p>
                    <p className="text-[11px] text-slate-400">{doc.qualifications?.join(', ')}</p>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {doc.rating || 4.9}
                      <span className="text-slate-400 font-normal">({doc.totalReviews || 180})</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{doc.bio}</p>

                <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('experience')}</span>
                    <span className="font-semibold text-slate-700">{doc.experienceYears || 10}+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('consultationFee')}</span>
                    <span className="font-bold text-[#123B5D]">Rs. {doc.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('languages')}</span>
                    <span className="font-medium text-slate-700">{doc.languages?.join(', ') || 'English, Hindi, Marathi'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingDoctor(doc);
                  setBookingSuccess(null);
                }}
                className="w-full py-2.5 bg-[#123B5D] hover:bg-[#18A999] text-white text-xs font-semibold rounded-xl text-center transition-colors"
              >
                {t('bookSlotBtn')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-slate-100 shadow-2xl">
            <button
              onClick={() => setBookingDoctor(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#123B5D]">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-500">
                  Your appointment #{bookingSuccess.appointmentNumber} with Dr. {bookingDoctor.user?.firstName} has been booked.
                </p>
                <div className="pt-2">
                  <Link
                    to="/patient/appointments"
                    className="px-6 py-2.5 bg-[#18A999] text-white text-xs font-semibold rounded-xl inline-block"
                  >
                    {t('myAppointments')}
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#123B5D]">
                    {t('bookSlotBtn')}: Dr. {bookingDoctor.user?.firstName} {bookingDoctor.user?.lastName}
                  </h3>
                  <p className="text-xs text-slate-400">{bookingDoctor.specialization} • Rs. {bookingDoctor.consultationFee}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Select Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#18A999]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Choose Slot</label>
                  <select
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#18A999]"
                  >
                    <option value="09:30 AM">09:30 AM - 10:00 AM</option>
                    <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                    <option value="11:00 AM">11:00 AM - 11:30 AM</option>
                    <option value="04:30 PM">04:30 PM - 05:00 PM</option>
                    <option value="06:00 PM">06:00 PM - 06:30 PM</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#18A999] hover:bg-[#128275] text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
                >
                  {t('bookNow')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
