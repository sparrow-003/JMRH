
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, PenTool } from 'lucide-react';
import { askAssistant } from '../services/gemini';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Good day. I am the JMRH Research Assistant. How may I assist you with your submission or inquiry today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: response || 'I apologize, I was unable to process your request.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-bg p-5 rounded-full shadow-2xl hover:bg-accent transition-all flex items-center justify-center transform hover:scale-110"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="bg-bg w-80 md:w-96 h-[550px] rounded-[2.5rem] shadow-2xl border border-accent/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-primary p-6 text-bg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <PenTool size={18} className="text-accent" />
              <span className="font-serif italic text-sm">JMRH Scholar Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-accent p-1 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white rounded-br-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-accent/10 rounded-bl-none italic'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-accent/10 rounded-bl-none">
                  <Loader2 size={16} className="animate-spin text-accent" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-accent/5 bg-white/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Inquire about guidelines, fees..."
                className="w-full pl-6 pr-14 py-4 border border-accent/10 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm bg-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-accent hover:text-primary transition-colors disabled:text-slate-300"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-300 mt-4 uppercase tracking-widest font-bold">Research Intelligence • Gemini AI</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;

// Updated for git commit
