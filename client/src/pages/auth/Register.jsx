import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { showToast } from '../../store/uiSlice';
import API from '../../services/api';
import { Heart, User, Mail, Lock, Phone } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get('role') || 'patient');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/register', {
        firstName,
        lastName,
        email,
        phone,
        password,
        role
      });
      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
      dispatch(showToast({ type: 'success', message: 'Account successfully registered!' }));

      if (role === 'doctor') navigate('/doctor/dashboard');
      else if (role === 'pharmacist') navigate('/pharmacy/dashboard');
      else if (role === 'lab_admin') navigate('/laboratory/dashboard');
      else if (role === 'hospital_admin') navigate('/hospital/dashboard');
      else navigate('/patient/dashboard');
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.response?.data?.message || 'Registration failed.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200 card-shadow space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B5D] to-[#18A999] flex items-center justify-center mx-auto">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#123B5D]">Create CareVanta Account</h2>
          <p className="text-xs text-slate-500">Join our connected digital healthcare ecosystem</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`py-2 rounded-xl transition-colors ${role === 'patient' ? 'bg-[#18A999] text-white shadow-sm' : 'text-slate-600'}`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setRole('doctor')}
            className={`py-2 rounded-xl transition-colors ${role === 'doctor' ? 'bg-[#18A999] text-white shadow-sm' : 'text-slate-600'}`}
          >
            Doctor
          </button>
          <button
            type="button"
            onClick={() => setRole('pharmacist')}
            className={`py-2 rounded-xl transition-colors ${role === 'pharmacist' ? 'bg-[#18A999] text-white shadow-sm' : 'text-slate-600'}`}
          >
            Pharmacy
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98200 00000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#18A999] hover:bg-[#128275] text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
          >
            {loading ? 'Creating Account...' : `Register as ${role.toUpperCase()}`}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#18A999] font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
