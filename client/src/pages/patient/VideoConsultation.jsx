import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, MessageSquare, PhoneOff, User, FileText, Send } from 'lucide-react';

export default function VideoConsultation() {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'Dr. Dipali Parkhede', text: 'Hello Dipali, I have reviewed your baseline complete blood count reports. How are you feeling today?' }
  ]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLogs([...chatLogs, { sender: 'Dipali Parkhede', text: chatMessage }]);
    setChatMessage('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6">
      {/* Video Screen Area */}
      <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative flex flex-col justify-between p-6 shadow-2xl">
        {/* Top Room Indicator */}
        <div className="flex items-center justify-between z-10">
          <div className="bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">Teleconsultation: Dr. Dipali Parkhede (Cardiology)</span>
          </div>
          <span className="bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
            Encrypted WebRTC
          </span>
        </div>

        {/* Doctor Main Video Mock Feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          {videoOn ? (
            <div className="text-center space-y-3">
              <img
                src="https://images.unsplash.com/photo-1594824813575-f538e124d9c7?w=800"
                alt="Doctor Feed"
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-[#18A999] mx-auto shadow-2xl"
              />
              <p className="text-white text-sm font-semibold">Dr. Dipali Parkhede is presenting</p>
            </div>
          ) : (
            <div className="text-slate-500 text-xs">Camera paused</div>
          )}
        </div>

        {/* Patient PIP Video Feed */}
        <div className="absolute bottom-24 right-6 w-32 h-24 bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden flex items-center justify-center text-white text-xs shadow-lg">
          <div className="text-center">
            <User className="w-6 h-6 text-slate-400 mx-auto" />
            <span className="text-[10px] text-slate-300">Dipali Parkhede</span>
          </div>
        </div>

        {/* Video Call Controls Bottom Bar */}
        <div className="z-10 flex items-center justify-center gap-4 bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl mx-auto max-w-md">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3 rounded-xl transition-colors ${micOn ? 'bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3 rounded-xl transition-colors ${videoOn ? 'bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
          >
            {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="p-3 bg-slate-700 text-white rounded-xl"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert('Consultation session ended. Summary saved.')}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <PhoneOff className="w-4 h-4" /> End Call
          </button>
        </div>
      </div>

      {/* Side Consultation Chat & Clinical Notes */}
      {chatOpen && (
        <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 card-shadow flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#18A999]" />
            <h3 className="font-bold text-xs text-[#123B5D]">Consultation Chat & Notes</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {chatLogs.map((log, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-[#123B5D] block text-[11px]">{log.sender}</span>
                <p className="text-slate-600 leading-relaxed">{log.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Send message to doctor..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#18A999]"
            />
            <button type="submit" className="p-2 bg-[#18A999] text-white rounded-xl">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
