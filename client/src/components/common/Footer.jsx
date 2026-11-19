import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { Heart, ShieldCheck, Lock, Award, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#123B5D] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#18A999] to-[#247BA0] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Care<span className="text-[#18A999]">Vanta</span> AI
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {t('footerMission')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#18A999]" /> ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white">
                <Lock className="w-3.5 h-3.5 text-[#18A999]" /> 256-Bit SSL
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white">
                <Award className="w-3.5 h-3.5 text-[#18A999]" /> ABDM Ready
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/doctors" className="hover:text-white transition-colors">{t('findDoctors')}</Link></li>
              <li><Link to="/pharmacy" className="hover:text-white transition-colors">{t('pharmacy')}</Link></li>
              <li><Link to="/lab-tests" className="hover:text-white transition-colors">{t('labTests')}</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">{t('healthPackages')}</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-white transition-colors">{t('aiAssistant')}</Link></li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('partnerPortals')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/register?role=doctor" className="hover:text-white transition-colors">Doctor Onboarding</Link></li>
              <li><Link to="/register?role=hospital_admin" className="hover:text-white transition-colors">Hospital Network</Link></li>
              <li><Link to="/register?role=pharmacist" className="hover:text-white transition-colors">Pharmacy Network</Link></li>
              <li><Link to="/register?role=lab_admin" className="hover:text-white transition-colors">Diagnostic Laboratory</Link></li>
              <li><Link to="/verify-report/sample" className="hover:text-white transition-colors">{t('launchVerifier')}</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">{t('contactSupport')}</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#18A999] shrink-0 mt-0.5" />
                <span>BKC Healthtech Center, Bandra, Mumbai 400051</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#18A999] shrink-0" />
                <span>+91 1800 200 8900 (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#18A999] shrink-0" />
                <span>care@carevanta.ai</span>
              </p>
              <div className="pt-2">
                <span className="block text-xs font-semibold text-red-400">AMBULANCE & TRAUMA: 112 / 108</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {t('allRightsReserved')}</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-white">{t('privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-white">{t('termsOfService')}</Link>
            <Link to="/disclaimer" className="hover:text-white">{t('medicalDisclaimer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
