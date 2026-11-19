import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Toast from '../components/common/Toast';
import {
  Heart, LayoutDashboard, Calendar, Video, Pill, ShoppingBag,
  FileText, FolderHeart, FlaskConical, Activity, Sparkles,
  Lock, CreditCard, Users, Settings, LogOut, Bell, Menu, X,
  Clock, ShieldAlert, Award, ChevronRight
} from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const role = user?.role || 'patient';

  // Navigation Menus for each Role
  const patientLinks = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Video Consultations', path: '/patient/video-consultation', icon: Video },
    { name: 'My Prescriptions', path: '/patient/prescriptions', icon: FileText },
    { name: 'My Medical Reports', path: '/patient/reports', icon: FolderHeart },
    { name: 'Medical Locker', path: '/patient/documents', icon: Lock },
    { name: 'Pharmacy Orders', path: '/patient/orders', icon: ShoppingBag },
    { name: 'Lab Test Bookings', path: '/patient/lab-bookings', icon: FlaskConical },
    { name: 'AI Health Assistant', path: '/ai-assistant', icon: Sparkles, highlight: true },
    { name: 'Family Health', path: '/patient/family', icon: Users },
    { name: 'Medicine Reminders', path: '/patient/reminders', icon: Clock },
    { name: 'Settings & Profile', path: '/patient/settings', icon: Settings }
  ];

  const doctorLinks = [
    { name: 'Doctor Overview', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Appointments Queue', path: '/doctor/appointments', icon: Calendar },
    { name: 'Video Consultation Room', path: '/doctor/consultation-room', icon: Video },
    { name: 'Issue Prescription', path: '/doctor/prescriptions', icon: FileText },
    { name: 'Compile Clinical Report', path: '/doctor/reports', icon: FolderHeart },
    { name: 'Availability & Slots', path: '/doctor/availability', icon: Clock },
    { name: 'Earnings & Payouts', path: '/doctor/earnings', icon: CreditCard }
  ];

  const pharmacyLinks = [
    { name: 'Pharmacy Dashboard', path: '/pharmacy/dashboard', icon: LayoutDashboard },
    { name: 'Medicine Inventory', path: '/pharmacy/inventory', icon: Pill },
    { name: 'Customer Orders', path: '/pharmacy/orders', icon: ShoppingBag },
    { name: 'Prescription Verification', path: '/pharmacy/prescriptions', icon: ShieldAlert }
  ];

  const labLinks = [
    { name: 'Laboratory Dashboard', path: '/laboratory/dashboard', icon: LayoutDashboard },
    { name: 'Diagnostic Tests Catalog', path: '/laboratory/tests', icon: FlaskConical },
    { name: 'Sample Collection Queue', path: '/laboratory/bookings', icon: Calendar },
    { name: 'Publish Finalized Reports', path: '/laboratory/reports', icon: FileText }
  ];

  const hospitalLinks = [
    { name: 'Hospital Overview', path: '/hospital/dashboard', icon: LayoutDashboard },
    { name: 'Departments & Beds', path: '/hospital/departments', icon: Activity },
    { name: 'Doctors Roster', path: '/hospital/doctors', icon: Users },
    { name: 'Admission & Discharges', path: '/hospital/admissions', icon: FolderHeart }
  ];

  const adminLinks = [
    { name: 'Ecosystem Analytics', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Verification Approvals', path: '/admin/verifications', icon: Award },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Security Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert }
  ];

  let currentLinks = patientLinks;
  if (role === 'doctor') currentLinks = doctorLinks;
  else if (role === 'pharmacist') currentLinks = pharmacyLinks;
  else if (role === 'lab_admin') currentLinks = labLinks;
  else if (role === 'hospital_admin') currentLinks = hospitalLinks;
  else if (role === 'super_admin') currentLinks = adminLinks;

  return (
    <div className="flex h-screen bg-[#F5F8FC] overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#123B5D] text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-slate-700/60 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#18A999] to-[#247BA0] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                Care<span className="text-[#18A999]">Vanta</span>
              </span>
              <span className="block text-[9px] text-[#E8F7F3] font-semibold tracking-wider">
                {role.toUpperCase().replace('_', ' ')} PORTAL
              </span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-3 mb-2">
            Workspace
          </div>
          {currentLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#18A999] text-white shadow-md shadow-[#18A999]/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : (item.highlight ? 'text-[#18A999]' : 'text-slate-400')}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="text-[9px] bg-[#18A999] text-white px-1.5 py-0.5 rounded font-bold">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-slate-700/60 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#18A999] text-white font-bold flex items-center justify-center shrink-0">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-[#123B5D]">
              CareVanta Ecosystem Workspace
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/ai-assistant"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F7F3] text-[#18A999] border border-[#18A999]/30 text-xs font-semibold hover:bg-[#18A999] hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Health Assistant
            </Link>
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-[#18A999] font-medium hidden md:inline"
            >
              Back to Public Portal
            </Link>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  );
}
