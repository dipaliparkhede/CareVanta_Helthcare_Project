import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { setLanguage } from '../../store/uiSlice';
import useTranslation from '../../hooks/useTranslation';
import { 
  Heart, Activity, Stethoscope, Pill, FlaskConical, 
  Sparkles, ShoppingCart, User, LogOut, Menu, X, Globe,
  ShieldCheck, PhoneCall, ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { t, language } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinks = [
    { name: t('findDoctors'), path: '/doctors', icon: Stethoscope },
    { name: t('pharmacy'), path: '/pharmacy', icon: Pill },
    { name: t('labTests'), path: '/lab-tests', icon: FlaskConical },
    { name: t('healthPackages'), path: '/packages', icon: Activity },
    { name: t('aiAssistant'), path: '/ai-assistant', icon: Sparkles, badge: 'AI' }
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'doctor': return '/doctor/dashboard';
      case 'pharmacist': return '/pharmacy/dashboard';
      case 'lab_admin': return '/laboratory/dashboard';
      case 'hospital_admin': return '/hospital/dashboard';
      case 'super_admin': return '/admin/dashboard';
      default: return '/patient/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Top Emergency & Trust Ribbon */}
      <div className="bg-[#123B5D] text-white text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1 font-medium bg-[#18A999]/20 text-[#E8F7F3] px-2 py-0.5 rounded text-[11px]">
            <ShieldCheck className="w-3 h-3 text-[#18A999]" /> {t('abdmCompliant')}
          </span>
          <span className="hidden md:inline text-slate-300">{t('nationalNetwork')}</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="tel:112" className="flex items-center gap-1 text-[#E8F7F3] hover:text-white font-semibold">
            <PhoneCall className="w-3 h-3 text-red-400 animate-pulse" /> {t('emergencyHelpline')}
          </a>
          <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
            <Globe className="w-3.5 h-3.5 text-[#18A999]" />
            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              aria-label="Select Language"
              className="bg-transparent text-white text-xs font-bold cursor-pointer focus:outline-none"
            >
              <option value="en" className="text-slate-900 font-medium">English</option>
              <option value="hi" className="text-slate-900 font-medium">हिंदी (Hindi)</option>
              <option value="mr" className="text-slate-900 font-medium">मराठी (Marathi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B5D] via-[#247BA0] to-[#18A999] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-[#123B5D] font-sans">
              Medi<span className="text-[#18A999]">Care</span>
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded font-semibold bg-[#E8F7F3] text-[#18A999] border border-[#18A999]/30">AI</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide leading-none">{t('intelligentHealthcare')}</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-[#18A999] bg-[#E8F7F3]' 
                    : 'text-[#172B3A] hover:text-[#18A999] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#18A999]' : 'text-slate-400'}`} />
                {link.name}
                {link.badge && (
                  <span className="text-[10px] bg-gradient-to-r from-[#18A999] to-[#247BA0] text-white px-1.5 py-0.2 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Cart, Auth, Dashboard) */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Pharmacy Cart Button */}
          <Link
            to="/pharmacy/cart"
            className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-[#18A999] hover:border-[#18A999] transition-colors"
            title={t('cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#DC2626] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </Link>

          {/* User Profile or Login */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B5D] text-white font-medium text-sm hover:bg-[#0c273e] shadow-sm transition-all"
              >
                <User className="w-4 h-4 text-[#18A999]" />
                <span>{user?.firstName || 'Dipali'}</span>
                <span className="text-[10px] bg-[#18A999] text-white px-1.5 py-0.5 rounded font-semibold capitalize">
                  {user?.role?.replace('_', ' ')}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-[#123B5D] hover:text-[#18A999] transition-colors"
              >
                {t('logIn')}
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#18A999] to-[#247BA0] text-white hover:opacity-95 shadow-md shadow-[#18A999]/20 transition-all"
              >
                {t('register')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Link to="/pharmacy/cart" className="p-2 text-slate-700 relative">
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-[#E8F7F3] hover:text-[#18A999]"
              >
                <Icon className="w-5 h-5 text-[#18A999]" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-[#123B5D] text-white rounded-xl text-sm font-semibold"
                >
                  {t('dashboard')} ({user?.role})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2 text-red-600 text-sm font-medium"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700"
                >
                  {t('logIn')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 bg-[#18A999] text-white rounded-xl text-sm font-semibold"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
