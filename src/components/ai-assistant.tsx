"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "./ui/button";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Halo Mitra! 👋 Ada yang ingin ditanyakan tentang stok atau harga cabai hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Gagal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="fixed z-[999] bottom-8 right-8" drag dragConstraints={{ left: -300, right: 0, top: -500, bottom: 0 }}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-red-600 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Bot size={28} className="text-white" />
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-80 h-[500px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-stone-100 flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-stone-950 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-sm">Asisten Cabai AI</p>
                  <p className="text-[10px] text-stone-400">Aktif • Siap Membantu</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`p-4 rounded-2xl text-sm max-w-[85%] ${m.role === 'user' ? 'bg-red-600 text-white rounded-br-none ml-auto' : 'bg-white text-stone-700 rounded-bl-none'}`}>
                  {m.content}
                </div>
              ))}
              {isLoading && <p className="text-xs text-stone-400 animate-pulse">AI sedang berpikir...</p>}
            </div>

            <div className="p-4 border-t flex gap-2 bg-white">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Tanya harga atau stok..." 
                className="flex-1 bg-stone-100 rounded-xl px-4 text-sm focus:outline-none"
              />
              <Button onClick={sendMessage} disabled={isLoading} className="w-10 h-10 p-0 rounded-xl bg-red-600">
                <Send size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}