import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { showToast } from '../../store/uiSlice';
import API from '../../services/api';
import { Heart, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      dispatch(showToast({ type: 'success', message: `Welcome back, ${res.data.user.firstName}!` }));

      switch (res.data.user.role) {
        case 'doctor': navigate('/doctor/dashboard'); break;
        case 'pharmacist': navigate('/pharmacy/dashboard'); break;
        case 'lab_admin': navigate('/laboratory/dashboard'); break;
        case 'hospital_admin': navigate('/hospital/dashboard'); break;
        case 'super_admin': navigate('/admin/dashboard'); break;
        default: navigate('/patient/dashboard'); break;
      }
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.response?.data?.message || 'Login failed.' }));
    } finally {
      setLoading(false);
    }
  };

  const setDemo = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 card-shadow space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#18A999] flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#123B5D]">Log in to CareVanta AI</h2>
          <p className="text-xs text-slate-500">Access your healthcare records, appointments & portals</p>
        </div>

        {/* Demo Accounts Quick-Fill Ribbon */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-2">
          <p className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">Demo Quick Fill:</p>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button type="button" onClick={() => setDemo('patient@carevanta.ai', 'Patient@Password123')} className="p-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 hover:border-[#18A999]">Patient</button>
            <button type="button" onClick={() => setDemo('dr.sharma@carevanta.ai', 'Doctor@Password123')} className="p-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 hover:border-[#18A999]">Doctor</button>
            <button type="button" onClick={() => setDemo('pharmacist@carevanta.ai', 'Pharmacy@Password123')} className="p-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 hover:border-[#18A999]">Pharmacy</button>
            <button type="button" onClick={() => setDemo('lab@carevanta.ai', 'Lab@Password123')} className="p-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 hover:border-[#18A999]">Lab</button>
            <button type="button" onClick={() => setDemo('hospital@carevanta.ai', 'Hospital@Password123')} className="p-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 hover:border-[#18A999]">Hospital</button>
            <button type="button" onClick={() => setDemo('admin@carevanta.ai', 'Admin@Password123')} className="p-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 hover:border-[#18A999]">Admin</button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@carevanta.ai"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#18A999]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#18A999]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#18A999] hover:bg-[#128275] text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#18A999] font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
