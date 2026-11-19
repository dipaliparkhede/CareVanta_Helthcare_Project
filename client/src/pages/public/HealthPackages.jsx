import React, { useState, useEffect } from 'react';
import useTranslation from '../../hooks/useTranslation';
import API from '../../services/api';
import { Activity, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function HealthPackages() {
  const [packages, setPackages] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    API.get('/health-packages').then(res => setPackages(res.data.items || [])).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-[#123B5D] text-white p-8 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">{t('packagesBadge')}</span>
        <h1 className="text-3xl font-extrabold text-white">{t('packagesTitle')}</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          {t('heroSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white rounded-3xl p-8 border border-slate-200 card-shadow flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-[#E8F7F3] text-[#18A999] px-3 py-1 rounded-full">
                  {pkg.totalTestsCount || 85}+ {t('biomarkerParams')}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                  {pkg.discountPercent || 50}% OFF
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#123B5D]">{pkg.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pkg.description}</p>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">{t('keyInclusions')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {pkg.includedTests?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#18A999] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold text-[#123B5D]">Rs. {pkg.price}</span>
                <span className="text-sm text-slate-400 line-through ml-2">Rs. {pkg.mrp}</span>
              </div>
              <button
                onClick={() => alert(`Package "${pkg.name}" reserved.`)}
                className="px-6 py-3 bg-[#18A999] hover:bg-[#128275] text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
              >
                {t('bookPackageBtn')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
