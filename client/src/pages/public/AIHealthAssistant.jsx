import React, { useState } from 'react';
import API from '../../services/api';
import {
  Sparkles, Stethoscope, FileText, Camera, Send,
  AlertTriangle, CheckCircle2, Globe, Bot, User, RefreshCw
} from 'lucide-react';

export default function AIHealthAssistant() {
  const [activeTab, setActiveTab] = useState('symptoms'); // 'symptoms', 'chat', 'analyzer', 'ocr'
  const [language, setLanguage] = useState('en');

  // Symptoms state
  const [symptomInput, setSymptomInput] = useState('');
  const [symptomAge, setSymptomAge] = useState('32');
  const [symptomGender, setSymptomGender] = useState('Male');
  const [symptomResult, setSymptomResult] = useState(null);
  const [loadingSymptoms, setLoadingSymptoms] = useState(false);

  // Chat state
  const [chatQuery, setChatQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello, I am CareVanta AI, your digital health intelligence assistant. How can I assist you with clinical explanations or medical wellness questions today?'
    }
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  // Report analyzer state
  const [reportText, setReportText] = useState('Hemoglobin: 11.2 g/dL (Normal: 13.0 - 17.0)
Total Cholesterol: 242 mg/dL (Normal: < 200)
Triglycerides: 198 mg/dL (Normal: < 150)
Fasting Blood Sugar: 104 mg/dL (Normal: 70 - 100)');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // OCR state
  const [ocrResult, setOcrResult] = useState(null);
  const [loadingOcr, setLoadingOcr] = useState(false);

  // Handlers
  const handleCheckSymptoms = async (e) => {
    e.preventDefault();
    if (!symptomInput) return;
    setLoadingSymptoms(true);
    try {
      const res = await API.post('/ai/symptoms', {
        symptoms: symptomInput.split(',').map(s => s.trim()),
        age: symptomAge,
        gender: symptomGender,
        language
      });
      setSymptomResult(res.data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSymptoms(false);
    }
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    const userMsg = chatQuery;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatQuery('');
    setLoadingChat(true);

    try {
      const res = await API.post('/ai/chat', { query: userMsg, language });
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.result?.answer || 'I could not process this request.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error communicating with medical intelligence engine.' }]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleAnalyzeReport = async () => {
    setLoadingAnalysis(true);
    try {
      const sampleParams = [
        { parameterName: 'Hemoglobin', measuredValue: '11.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', interpretation: 'Low' },
        { parameterName: 'Total Cholesterol', measuredValue: '242', unit: 'mg/dL', referenceRange: '< 200', interpretation: 'High' },
        { parameterName: 'Triglycerides', measuredValue: '198', unit: 'mg/dL', referenceRange: '< 150', interpretation: 'High' },
        { parameterName: 'Fasting Blood Sugar', measuredValue: '104', unit: 'mg/dL', referenceRange: '70 - 100', interpretation: 'High' }
      ];
      const res = await API.post('/ai/analyze-report', { reportText, parameters: sampleParams, language });
      setAnalysisResult(res.data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleProcessOcr = async () => {
    setLoadingOcr(true);
    try {
      const res = await API.post('/ai/ocr-prescription', { rawText: 'Sample Prescription' });
      setOcrResult(res.data.ocrData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOcr(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#123B5D] text-white p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18A999]/20 text-[#E8F7F3] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#18A999]" /> Multilingual Medical AI
          </div>
          <h1 className="text-3xl font-extrabold text-white">CareVanta AI Health Suite</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Intelligent symptom guidance, clinical terminology explanations, report analysis, and prescription OCR.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 text-xs">
          <Globe className="w-4 h-4 text-[#18A999]" />
          <span className="font-semibold text-white">Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
          >
            <option value="en" className="text-slate-900">English</option>
            <option value="hi" className="text-slate-900">हिंदी (Hindi)</option>
            <option value="mr" className="text-slate-900">मराठी (Marathi)</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('symptoms')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === 'symptoms' ? 'border-[#18A999] text-[#18A999]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Stethoscope className="w-4 h-4" /> Symptom Guidance
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === 'chat' ? 'border-[#18A999] text-[#18A999]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" /> Health Q&A Assistant
        </button>
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === 'analyzer' ? 'border-[#18A999] text-[#18A999]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Medical Report Analyzer
        </button>
        <button
          onClick={() => setActiveTab('ocr')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === 'ocr' ? 'border-[#18A999] text-[#18A999]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Camera className="w-4 h-4" /> Prescription OCR
        </button>
      </div>

      {/* Tab 1: Symptom Guidance */}
      {activeTab === 'symptoms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
          <form onSubmit={handleCheckSymptoms} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#123B5D] uppercase tracking-wider block mb-1">
                Describe Your Current Symptoms
              </label>
              <textarea
                rows={3}
                required
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="e.g. Mild headache, dry cough, slight fever for 2 days..."
                className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#18A999]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Age</label>
                <input
                  type="number"
                  value={symptomAge}
                  onChange={(e) => setSymptomAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Gender</label>
                <select
                  value={symptomGender}
                  onChange={(e) => setSymptomGender(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingSymptoms}
              className="px-6 py-3 bg-[#18A999] hover:bg-[#128275] text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
            >
              {loadingSymptoms ? 'Analyzing Clinical Biomarkers...' : 'Analyze Symptoms'}
            </button>
          </form>

          {symptomResult && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinical Evaluation</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  symptomResult.triageLevel === 'EMERGENCY' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {symptomResult.triageLevel}
                </span>
              </div>

              {symptomResult.warning && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  {symptomResult.warning}
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#123B5D]">Recommended Specialist</h4>
                <p className="text-xs text-[#18A999] font-bold">{symptomResult.recommendedSpecialist}</p>
              </div>

              {symptomResult.selfCareTips && (
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-slate-700">Self-Care Suggestions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {symptomResult.selfCareTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-200">
                {symptomResult.disclaimer}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Health Q&A Assistant */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-slate-200 card-shadow flex flex-col h-[520px]">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#18A999]" />
            <h3 className="font-bold text-sm text-[#123B5D]">CareVanta Medical Q&A Session</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#E8F7F3] text-[#18A999] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                  m.sender === 'user' ? 'bg-[#123B5D] text-white' : 'bg-slate-100 text-slate-800'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loadingChat && (
              <div className="text-xs text-slate-400 italic">CareVanta AI is generating clinical response...</div>
            )}
          </div>

          <form onSubmit={handleSendChat} className="p-4 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask any health or medicine question (e.g. What is normal blood pressure?)..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#18A999]"
            />
            <button
              type="submit"
              disabled={loadingChat}
              className="p-2.5 bg-[#18A999] hover:bg-[#128275] text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Medical Report Analyzer */}
      {activeTab === 'analyzer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#123B5D]">Enter Report Biomarkers or Paste Clinical Findings</h3>
            <p className="text-xs text-slate-500">The analyzer extracts out-of-range indicators and provides simple clinical terminology explanations.</p>
            <textarea
              rows={4}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#18A999]"
            />
          </div>

          <button
            onClick={handleAnalyzeReport}
            disabled={loadingAnalysis}
            className="px-6 py-2.5 bg-[#18A999] text-white font-semibold text-xs rounded-xl shadow-md"
          >
            {loadingAnalysis ? 'Evaluating...' : 'Analyze Report Findings'}
          </button>

          {analysisResult && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-[#123B5D]">Clinical Summary</h4>
              <p className="text-xs text-slate-700 font-medium">{analysisResult.summary}</p>

              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">Abnormal Biomarkers Detected ({analysisResult.abnormalBiomarkersCount})</h5>
                {analysisResult.abnormalParameters?.map((param, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-red-100 flex items-start justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{param.parameter}:</span>
                      <span className="text-red-600 font-bold ml-1.5">{param.value}</span>
                      <span className="text-slate-400 ml-2">(Baseline: {param.referenceRange})</span>
                      <p className="text-slate-500 mt-1">{param.simpleExplanation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-200">{analysisResult.disclaimer}</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Prescription OCR */}
      {activeTab === 'ocr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#123B5D]">Prescription OCR Scanner</h3>
            <p className="text-xs text-slate-500">Upload or test OCR image extraction for prescription medications.</p>
          </div>

          <button
            onClick={handleProcessOcr}
            disabled={loadingOcr}
            className="px-6 py-2.5 bg-[#18A999] text-white font-semibold text-xs rounded-xl shadow-md"
          >
            {loadingOcr ? 'Scanning Prescription...' : 'Test Prescription OCR Scan'}
          </button>

          {ocrResult && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  OCR Confidence: {Math.round(ocrResult.confidenceScore * 100)}%
                </span>
                <span className="text-xs text-amber-700 font-semibold">Human Review Mandatory</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-600">Detected Medicines</h4>
                {ocrResult.detectedMedicines?.map((m, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex justify-between">
                    <div>
                      <span className="font-bold text-[#123B5D]">{m.name}</span> ({m.strength})
                      <span className="block text-slate-400">{m.dosage} • {m.frequency} • {m.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-600 font-medium bg-amber-50 p-3 rounded-xl border border-amber-200">
                {ocrResult.verificationNotice}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
