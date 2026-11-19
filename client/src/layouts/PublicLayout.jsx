import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Toast from '../components/common/Toast';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8FC]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
