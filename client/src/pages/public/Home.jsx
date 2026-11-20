import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { showToast } from '../../store/uiSlice';
import useTranslation from '../../hooks/useTranslation';
import API from '../../services/api';
import {
  Stethoscope, Pill, FlaskConical, Activity, Sparkles,
  ShieldCheck, Search, Star, Clock, CheckCircle2, ArrowRight,
  PhoneCall, Heart, Award, Users, FileCheck, Building2, ChevronRight
} from 'lucide-react';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('doctor');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/doctors?limit=3').then(res => setDoctors(res.data.data || [])).catch(() => {});
    API.get('/medicines?limit=4').then(res => setMedicines(res.data.data || [])).catch(() => {});
    API.get('/lab-tests').then(res => setLabTests(res.data.tests?.slice(0, 3) || [])).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === 'doctor') {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    } else if (searchType === 'medicine') {
      navigate(`/pharmacy?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/lab-tests?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const specializations = [
    { name: t('cardiology'), icon: Heart, count: '14 Specialists', desc: t('cardiologyDesc') },
    { name: t('neurology'), icon: Activity, count: '8 Specialists', desc: t('neurologyDesc') },
    { name: t('generalMedicine'), icon: Stethoscope, count: '28 Specialists', desc: t('generalMedicineDesc') },
    { name: t('pediatrics'), icon: Users, count: '12 Specialists', desc: t('pediatricsDesc') },
    { name: t('diagnostics'), icon: FlaskConical, count: '45+ Tests', desc: t('diagnosticsDesc') },
    { name: t('pharmacy'), icon: Pill, count: '2,500+ Medicines', desc: t('pharmacySpecDesc') }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F7F3]/70 via-[#F5F8FC] to-white pt-12 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Subheading, Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#18A999]/30 text-xs font-semibold text-[#18A999] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#18A999]" />
                {t('nextGenAI')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#123B5D] tracking-tight leading-tight">
                {t('heroTitlePrefix')} <span className="text-[#18A999]">{t('heroTitleHighlight1')}</span><br />
                {t('heroTitleMid')} <span className="text-[#247BA0]">{t('heroTitleHighlight2')}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Universal Search Bar */}
              <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-slate-200/80 max-w-2xl mx-auto lg:mx-0">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    aria-label="Filter service type"
                    className="bg-slate-50 border border-slate-200 text-xs font-semibold text-[#123B5D] px-3 py-3 rounded-xl focus:outline-none"
                  >
                    <option value="doctor">{t('findDoctors')}</option>
                    <option value="medicine">{t('pharmacy')}</option>
                    <option value="lab">{t('labTests')}</option>
                  </select>
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={searchType === 'doctor' ? t('searchDoctorPlaceholder') : (searchType === 'medicine' ? t('searchMedicinePlaceholder') : t('searchLabPlaceholder'))}
                      className="w-full pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#18A999] hover:bg-[#128275] text-white font-semibold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    {t('search')}
                  </button>
                </form>
              </div>

              {/* Quick Action Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#18A999]" /> {t('verifiedPractitioners')}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#18A999]" /> {t('instantVideoConsults')}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#18A999]" /> {t('qrVerifiedReports')}
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Ecosystem Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F7F3] flex items-center justify-center text-[#18A999]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#123B5D] text-sm">{t('aiTriageTitle')}</h3>
                      <p className="text-[11px] text-slate-400">{t('aiTriageSubtitle')}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 border border-slate-100">
                  <p className="font-semibold text-slate-700">"{t('aiTriagePrompt')}"</p>
                  <p className="text-slate-500">{t('aiTriageDescription')}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/ai-assistant"
                    className="p-3 bg-[#E8F7F3] text-[#18A999] hover:bg-[#18A999] hover:text-white rounded-xl text-center font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    {t('checkSymptomsBtn')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/doctors"
                    className="p-3 bg-[#123B5D] text-white hover:bg-[#0c273e] rounded-xl text-center font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    {t('bookDoctorBtn')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 24x7 Emergency Help Pill */}
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-red-700 font-semibold">
                    <PhoneCall className="w-4 h-4 text-red-600 animate-pulse" />
                    <span>{t('emergencyAmbulance')}</span>
                  </div>
                  <a href="tel:112" className="px-2.5 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700">
                    {t('call112')}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Popular Clinical Specializations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('specialtiesBadge')}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">{t('specialtiesTitle')}</h2>
          </div>
          <Link to="/doctors" className="text-sm font-semibold text-[#18A999] hover:text-[#128275] flex items-center gap-1">
            {t('allSpecialties')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec) => {
            const Icon = spec.icon;
            return (
              <Link
                key={spec.name}
                to={`/doctors?specialization=${encodeURIComponent(spec.name)}`}
                className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow card-hover flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F7F3] text-[#18A999] flex items-center justify-center shrink-0 group-hover:bg-[#18A999] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#123B5D] group-hover:text-[#18A999] transition-colors">{spec.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{spec.desc}</p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-[#247BA0]">{spec.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Verified Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('featuredDoctorsBadge')}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">{t('featuredDoctorsTitle')}</h2>
          </div>
          <Link to="/doctors" className="text-sm font-semibold text-[#18A999] hover:text-[#128275] flex items-center gap-1">
            {t('seeAllDoctors')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc._id} className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={doc.user?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400'}
                    alt={doc.user?.firstName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#18A999]"
                  />
                  <div>
                    <h3 className="font-bold text-[#123B5D] text-base">Dr. {doc.user?.firstName} {doc.user?.lastName}</h3>
                    <p className="text-xs font-medium text-[#18A999]">{doc.specialization}</p>
                    <p className="text-[11px] text-slate-400">{doc.qualifications?.join(', ') || 'MBBS, MD'}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{doc.bio}</p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {doc.rating || 4.9} ({doc.totalReviews || 120})
                  </div>
                  <div className="font-bold text-[#123B5D]">
                    Rs. {doc.consultationFee} <span className="text-[10px] text-slate-400 font-normal">{t('perConsult')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <Link
                  to={`/doctors?book=${doc._id}`}
                  className="w-full py-2.5 bg-[#123B5D] hover:bg-[#18A999] text-white text-xs font-semibold rounded-xl text-center block transition-colors"
                >
                  {t('bookSlotBtn')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Online Pharmacy Specials */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('pharmacyBadge')}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">{t('pharmacyTitle')}</h2>
            </div>
            <Link to="/pharmacy" className="text-sm font-semibold text-[#18A999] hover:text-[#128275] flex items-center gap-1">
              {t('explorePharmacy')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicines.map((med) => (
              <div key={med._id} className="bg-[#F5F8FC] rounded-2xl p-5 border border-slate-200/60 card-hover flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden bg-white flex items-center justify-center p-2">
                    <img src={med.image} alt={med.name} className="h-full object-contain" />
                  </div>
                  <div>
                    {med.prescriptionRequired && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        {t('rxRequired')}
                      </span>
                    )}
                    <h3 className="font-bold text-sm text-[#123B5D] mt-1 line-clamp-1">{med.name}</h3>
                    <p className="text-[11px] text-slate-500">{med.brand} • {med.packSize}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#123B5D]">Rs. {med.price}</span>
                    <span className="text-[11px] text-slate-400 line-through ml-1.5">Rs. {med.mrp}</span>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(addToCart(med));
                      dispatch(showToast({ type: 'success', message: `${med.name} added to cart!` }));
                    }}
                    className="p-2 bg-[#18A999] hover:bg-[#128275] text-white rounded-xl transition-colors"
                    title={t('addToCart')}
                  >
                    <Pill className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Diagnostic Laboratory Tests */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('labBadge')}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D]">{t('labTitle')}</h2>
          </div>
          <Link to="/lab-tests" className="text-sm font-semibold text-[#18A999] hover:text-[#128275] flex items-center gap-1">
            {t('viewAllLabTests')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {labTests.map((test) => (
            <div key={test._id} className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-[#E8F7F3] text-[#18A999] px-2 py-0.5 rounded">
                    {test.category || 'Diagnostics'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {test.tatHours || 24} {t('turnaroundTime')}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#123B5D]">{test.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{test.description}</p>
                <div className="text-[11px] text-slate-600 font-medium pt-1">
                  {t('sampleType')} <span className="text-slate-800 font-semibold">{test.sampleType || 'Blood'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#123B5D]">Rs. {test.price}</span>
                  <span className="text-xs text-slate-400 line-through ml-1.5">Rs. {test.mrp}</span>
                </div>
                <Link
                  to="/lab-tests"
                  className="px-4 py-2 bg-[#123B5D] hover:bg-[#18A999] text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  {t('bookTest')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. How MediCare AI Works */}
      <section className="bg-gradient-to-r from-[#123B5D] to-[#247BA0] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#E8F7F3] tracking-widest uppercase">{t('howItWorksBadge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t('howItWorksTitle')}</h2>
            <p className="text-sm text-slate-200">{t('howItWorksSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#18A999] text-white font-bold flex items-center justify-center text-lg">1</div>
              <h3 className="font-bold text-base text-white">{t('step1Title')}</h3>
              <p className="text-xs text-slate-200">{t('step1Desc')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#18A999] text-white font-bold flex items-center justify-center text-lg">2</div>
              <h3 className="font-bold text-base text-white">{t('step2Title')}</h3>
              <p className="text-xs text-slate-200">{t('step2Desc')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#18A999] text-white font-bold flex items-center justify-center text-lg">3</div>
              <h3 className="font-bold text-base text-white">{t('step3Title')}</h3>
              <p className="text-xs text-slate-200">{t('step3Desc')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#18A999] text-white font-bold flex items-center justify-center text-lg">4</div>
              <h3 className="font-bold text-base text-white">{t('step4Title')}</h3>
              <p className="text-xs text-slate-200">{t('step4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verification CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t('cryptoIntegrity')}
            </div>
            <h3 className="text-2xl font-bold text-[#123B5D]">{t('verifyDocTitle')}</h3>
            <p className="text-xs text-slate-500 max-w-lg">
              {t('verifyDocSubtitle')}
            </p>
          </div>
          <Link
            to="/verify-report/CV-VERIFY-HEALTH99"
            className="px-6 py-3.5 bg-[#123B5D] hover:bg-[#0c273e] text-white font-semibold text-xs rounded-xl shadow-lg shrink-0 flex items-center gap-2"
          >
            {t('launchVerifier')} <ArrowRight className="w-4 h-4 text-[#18A999]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
