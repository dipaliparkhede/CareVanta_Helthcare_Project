import React, { useState, useEffect } from 'react';
import useTranslation from '../../hooks/useTranslation';
import API from '../../services/api';
import { FlaskConical, Clock, CheckCircle2, Home, ShieldCheck } from 'lucide-react';

export default function LabTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    API.get('/lab-tests').then(res => {
      setTests(res.data.tests || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-[#123B5D] text-white p-8 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('labBadge')}</span>
        <h1 className="text-3xl font-extrabold text-white">{t('labTitle')}</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          {t('heroSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test._id} className="bg-white rounded-2xl p-6 border border-slate-100 card-shadow space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-[#E8F7F3] text-[#18A999] px-2 py-0.5 rounded">
                  {test.category || 'Diagnostics'}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {test.tatHours || 24} {t('turnaroundTime')}
                </span>
              </div>
              <h3 className="font-bold text-base text-[#123B5D]">{test.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{test.description}</p>
              
              <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs">
                <p className="text-slate-600 font-medium">{t('sampleType')} <span className="text-slate-800 font-semibold">{test.sampleType || 'Blood'}</span></p>
                <p className="text-slate-600 font-medium">{t('fasting')} <span className="text-slate-800 font-semibold">{test.fastingRequired ? 'Required (8-10 hrs)' : 'Not Required'}</span></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-[#123B5D]">Rs. {test.price}</span>
                <span className="text-xs text-slate-400 line-through ml-1.5">Rs. {test.mrp}</span>
              </div>
              <button
                onClick={() => alert(`Test "${test.name}" booked for home collection.`)}
                className="px-4 py-2 bg-[#18A999] hover:bg-[#128275] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
              >
                {t('bookHomePickup')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
