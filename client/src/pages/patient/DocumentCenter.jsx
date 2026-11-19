import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Lock, Upload, FileText, Trash2, Folder, Download } from 'lucide-react';

export default function DocumentCenter() {
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState('All');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Prescriptions');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, [category]);

  const fetchDocs = async () => {
    try {
      let url = '/documents/my-documents';
      if (category !== 'All') url += `?category=${encodeURIComponent(category)}`;
      const res = await API.get(url);
      setDocuments(res.data.documents || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', uploadTitle || selectedFile.name);
    formData.append('category', uploadCategory);

    try {
      await API.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSelectedFile(null);
      setUploadTitle('');
      fetchDocs();
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete document from private medical locker?')) return;
    try {
      await API.delete(`/documents/${id}`);
      fetchDocs();
    } catch (err) {
      console.error(err);
    }
  };

  const categories = [
    'All',
    'Prescriptions',
    'Blood Reports',
    'X-Rays',
    'Scan Reports',
    'Medical Certificates',
    'Discharge Summaries',
    'Insurance Documents'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#123B5D] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#18A999] uppercase tracking-wider">Module 12</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Centralized Digital Medical Locker</h1>
          <p className="text-xs text-slate-300 mt-1">
            Secure, 256-bit encrypted storage for past clinical records, prescriptions, scans, and insurance policies.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 card-shadow space-y-4">
        <h3 className="text-sm font-bold text-[#123B5D]">Upload Record to Medical Locker</h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Document Title</label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="e.g. 2024 Cardiac Ultrasound"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Category</label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
            >
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Select File (PDF, PNG, JPG)</label>
            <input
              type="file"
              required
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-[#E8F7F3] file:text-[#18A999]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#18A999] hover:bg-[#128275] text-white text-xs font-semibold rounded-xl"
          >
            {loading ? 'Encrypting & Uploading...' : 'Upload to Locker'}
          </button>
        </form>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              category === c ? 'bg-[#18A999] text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc._id} className="bg-white p-5 rounded-2xl border border-slate-200 card-shadow space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#18A999] bg-[#E8F7F3] px-2 py-0.5 rounded">
                {doc.category}
              </span>
              <h4 className="font-bold text-sm text-[#123B5D] mt-1 line-clamp-1">{doc.title}</h4>
              <p className="text-[11px] text-slate-400">Uploaded {new Date(doc.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#18A999] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
              <button
                onClick={() => handleDelete(doc._id)}
                className="text-slate-400 hover:text-red-500"
                title="Delete document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
