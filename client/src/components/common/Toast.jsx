import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../store/uiSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-900',
    error: 'border-red-200 bg-red-50/90 text-red-900',
    info: 'border-blue-200 bg-blue-50/90 text-blue-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md ${borders[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={() => dispatch(hideToast())}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
