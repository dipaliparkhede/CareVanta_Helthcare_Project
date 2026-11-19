import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Pill, ShoppingBag, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function PharmacyDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/all-orders').then(res => setOrders(res.data.orders || [])).catch(() => {});
  }, []);

  const handleVerifyPrescription = async (orderId, status) => {
    try {
      await API.patch(`/orders/${orderId}/status`, {
        prescriptionVerificationStatus: status,
        orderStatus: status === 'Approved' ? 'Packed' : 'Cancelled'
      });
      alert(`Prescription ${status}. Order updated.`);
      window.location.reload();
    } catch (err) {
      alert('Update failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-1">
        <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Licensed Pharmacy Console</span>
        <h1 className="text-2xl font-bold text-white">Pharmacy Dispatch & Prescription Verification</h1>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord._id} className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#123B5D]">Order #{ord.orderNumber} - {ord.user?.firstName} {ord.user?.lastName}</h3>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                {ord.prescriptionVerificationStatus}
              </span>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-medium text-slate-700">Total: Rs. {ord.totalAmount}</p>
              <p className="text-slate-500">Items: {ord.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
            </div>

            {ord.prescriptionRequired && ord.prescriptionVerificationStatus === 'Pending Verification' && (
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleVerifyPrescription(ord._id, 'Approved')}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
                >
                  Approve Prescription & Dispense
                </button>
                <button
                  onClick={() => handleVerifyPrescription(ord._id, 'Rejected')}
                  className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl"
                >
                  Reject Prescription
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
