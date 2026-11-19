import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import FindDoctors from './pages/public/FindDoctors';
import OnlinePharmacy from './pages/public/OnlinePharmacy';
import LabTests from './pages/public/LabTests';
import HealthPackages from './pages/public/HealthPackages';
import AIHealthAssistant from './pages/public/AIHealthAssistant';
import ReportVerification from './pages/public/ReportVerification';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import MyAppointments from './pages/patient/MyAppointments';
import VideoConsultation from './pages/patient/VideoConsultation';
import MyMedicalReports from './pages/patient/MyMedicalReports';
import DocumentCenter from './pages/patient/DocumentCenter';
import MyPrescriptions from './pages/patient/MyPrescriptions';
import CartPage from './pages/patient/CartPage';
import MyOrders from './pages/patient/MyOrders';

// Provider Dashboards
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import LabDashboard from './pages/laboratory/LabDashboard';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<FindDoctors />} />
        <Route path="/pharmacy" element={<OnlinePharmacy />} />
        <Route path="/pharmacy/cart" element={<CartPage />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/packages" element={<HealthPackages />} />
        <Route path="/ai-assistant" element={<AIHealthAssistant />} />
        <Route path="/verify-report/:code" element={<ReportVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Patient Workspace */}
      <Route path="/patient" element={<DashboardLayout />}>
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="video-consultation" element={<VideoConsultation />} />
        <Route path="reports" element={<MyMedicalReports />} />
        <Route path="documents" element={<DocumentCenter />} />
        <Route path="prescriptions" element={<MyPrescriptions />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="lab-bookings" element={<LabTests />} />
        <Route path="family" element={<PatientDashboard />} />
        <Route path="reminders" element={<PatientDashboard />} />
        <Route path="settings" element={<PatientDashboard />} />
      </Route>

      {/* Doctor Workspace */}
      <Route path="/doctor" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorDashboard />} />
        <Route path="consultation-room" element={<VideoConsultation />} />
        <Route path="prescriptions" element={<MyPrescriptions />} />
        <Route path="reports" element={<MyMedicalReports />} />
        <Route path="availability" element={<DoctorDashboard />} />
        <Route path="earnings" element={<DoctorDashboard />} />
      </Route>

      {/* Pharmacy Workspace */}
      <Route path="/pharmacy" element={<DashboardLayout />}>
        <Route path="dashboard" element={<PharmacyDashboard />} />
        <Route path="inventory" element={<OnlinePharmacy />} />
        <Route path="orders" element={<PharmacyDashboard />} />
        <Route path="prescriptions" element={<PharmacyDashboard />} />
      </Route>

      {/* Laboratory Workspace */}
      <Route path="/laboratory" element={<DashboardLayout />}>
        <Route path="dashboard" element={<LabDashboard />} />
        <Route path="tests" element={<LabTests />} />
        <Route path="bookings" element={<LabDashboard />} />
        <Route path="reports" element={<LabDashboard />} />
      </Route>

      {/* Hospital Workspace */}
      <Route path="/hospital" element={<DashboardLayout />}>
        <Route path="dashboard" element={<HospitalDashboard />} />
        <Route path="departments" element={<HospitalDashboard />} />
        <Route path="doctors" element={<FindDoctors />} />
        <Route path="admissions" element={<HospitalDashboard />} />
      </Route>

      {/* Admin Workspace */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="verifications" element={<AdminDashboard />} />
        <Route path="users" element={<AdminDashboard />} />
        <Route path="audit-logs" element={<AdminDashboard />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
