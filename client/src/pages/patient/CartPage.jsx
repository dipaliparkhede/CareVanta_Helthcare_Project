import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart } from '../../store/cartSlice';
import { showToast } from '../../store/uiSlice';
import API from '../../services/api';
import { Trash2, ShoppingBag, ShieldCheck, ArrowRight, Pill } from 'lucide-react';

export default function CartPage() {
  const { items, subtotal, delivery, grandTotal } = useSelector((state) => state.cart);
  const [address, setAddress] = useState('Flat 402, Green Meadows, Bandra West, Mumbai 400050');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await API.post('/orders/create', {
        deliveryAddress: { street: address, city: 'Mumbai', state: 'Maharashtra', pincode: '400050' },
        paymentMethod: 'Razorpay'
      });
      dispatch(clearCart());
      dispatch(showToast({ type: 'success', message: 'Order successfully placed & confirmed!' }));
      navigate('/patient/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout error. Please verify authentication.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#123B5D]">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">Add medicines, wellness supplements, or diagnostic kits to proceed.</p>
        <Link
          to="/pharmacy"
          className="px-6 py-2.5 bg-[#18A999] text-white text-xs font-semibold rounded-xl inline-block"
        >
          Browse Online Pharmacy
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold text-[#123B5D]">Pharmacy Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-2xl border border-slate-200 card-shadow flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-slate-50 p-1 rounded-xl" />
                <div>
                  <h4 className="font-bold text-sm text-[#123B5D]">{item.name}</h4>
                  <p className="text-xs text-[#18A999] font-semibold">Rs. {item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-xl text-xs">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-bold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-4 h-fit">
          <h3 className="font-bold text-sm text-[#123B5D]">Order Summary</h3>
          <div className="space-y-2 text-xs border-b border-slate-100 pb-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-semibold text-slate-800">Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Fee:</span>
              <span className="font-semibold text-slate-800">{delivery === 0 ? 'FREE' : `Rs. ${delivery}`}</span>
            </div>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#123B5D]">
            <span>Grand Total:</span>
            <span>Rs. {grandTotal}</span>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-[11px] font-semibold text-slate-600">Delivery Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3 bg-[#18A999] hover:bg-[#128275] text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Processing Payment...' : 'Pay with Razorpay & Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
