import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { showToast } from '../../store/uiSlice';
import API from '../../services/api';
import { Pill, Search, ShoppingCart, ShieldAlert, CheckCircle2, Star } from 'lucide-react';

export default function OnlinePharmacy() {
  const [searchParams] = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    API.get('/categories').then(res => setCategories(res.data.categories || [])).catch(() => {});
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [selectedCategory, search]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      let url = '/medicines?limit=30';
      if (selectedCategory && selectedCategory !== 'All') url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await API.get(url);
      setMedicines(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-[#123B5D] text-white p-8 rounded-3xl space-y-3">
        <span className="text-xs font-bold text-[#18A999] tracking-wider uppercase">Doorstep Delivery</span>
        <h1 className="text-3xl font-extrabold text-white">CareVanta Digital Pharmacy</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Order 100% genuine medications, OTC wellness products, and medical devices with licensed pharmacist prescription verification.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'All' ? 'bg-[#18A999] text-white' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          All Products
        </button>
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => setSelectedCategory(c.name)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === c.name ? 'bg-[#18A999] text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading pharmacy products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((med) => (
            <div key={med._id} className="bg-white rounded-2xl p-5 border border-slate-100 card-shadow card-hover flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-3">
                  <img src={med.image} alt={med.name} className="h-full object-contain" />
                </div>
                <div>
                  {med.prescriptionRequired && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      Prescription Required (Rx)
                    </span>
                  )}
                  <h3 className="font-bold text-sm text-[#123B5D] mt-1 line-clamp-1">{med.name}</h3>
                  <p className="text-[11px] text-slate-500">{med.brand} • {med.packSize}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{med.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-base font-bold text-[#123B5D]">Rs. {med.price}</span>
                  <span className="text-xs text-slate-400 line-through ml-1.5">Rs. {med.mrp}</span>
                </div>
                <button
                  onClick={() => {
                    dispatch(addToCart(med));
                    dispatch(showToast({ type: 'success', message: `${med.name} added to cart!` }));
                  }}
                  className="px-3 py-1.5 bg-[#18A999] hover:bg-[#128275] text-white text-xs font-semibold rounded-xl flex items-center gap-1 shadow-sm transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
