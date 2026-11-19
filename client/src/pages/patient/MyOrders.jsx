import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { ShoppingBag, Clock, CheckCircle2, Truck } from 'lucide-react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/my-orders').then(res => setOrders(res.data.orders || [])).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl space-y-1">
        <h1 className="text-2xl font-bold text-white">Pharmacy Orders Tracking</h1>
        <p className="text-xs text-slate-300">Track delivery timeline, dispatch status, and download tax invoices.</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord._id} className="bg-white p-6 rounded-2xl border border-slate-200 card-shadow space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#123B5D]">Order #{ord.orderNumber}</h3>
                <p className="text-xs text-slate-400">Placed on {new Date(ord.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="text-xs font-bold bg-[#E8F7F3] text-[#18A999] px-3 py-1 rounded-full">
                {ord.orderStatus}
              </span>
            </div>

            <div className="space-y-2">
              {ord.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{item.name} × {item.quantity}</span>
                  <span className="font-semibold text-slate-800">Rs. {item.total}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Tracking: <strong className="text-slate-800">{ord.trackingNumber}</strong></span>
              <span className="text-sm font-bold text-[#123B5D]">Total: Rs. {ord.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
