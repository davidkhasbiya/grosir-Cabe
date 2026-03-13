"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, FileText, AlertCircle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: "pesanan", icon: <FileText />, title: "Masalah Pesanan", desc: "Status pengiriman atau refund" },
    { id: "fitur", icon: <MessageSquare />, title: "Fitur Aplikasi", desc: "Pertanyaan seputar alat bantu AI" },
    { id: "akun", icon: <AlertCircle />, title: "Keamanan Akun", desc: "Masalah login atau privasi" },
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Reset setelah 2 detik
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-stone-950/20 backdrop-blur-sm z-[1000]" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 m-auto z-[1001] w-[90%] max-w-lg h-[600px] bg-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col">
            
            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold">Tiket Terkirim!</h3>
                <p className="text-stone-500">Tim teknis kami akan segera menghubungi Anda.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black">Pusat Bantuan</h2>
                  <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full"><X size={20} /></button>
                </div>

                <div className="space-y-4 flex-1">
                  {categories.map((cat) => (
                    <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${selectedCategory === cat.id ? "border-red-500 bg-red-50" : "border-stone-100 hover:border-red-200"}`}
                    >
                      <div className={`p-3 rounded-xl ${selectedCategory === cat.id ? "bg-red-100 text-red-600" : "bg-stone-100 text-stone-600"}`}>
                        {cat.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{cat.title}</p>
                        <p className="text-xs text-stone-400">{cat.desc}</p>
                      </div>
                    </button>
                  ))}
                  
                  <textarea 
                    placeholder="Jelaskan kendala Anda..." 
                    className="w-full h-32 mt-4 p-4 bg-stone-50 rounded-2xl border-none focus:ring-2 ring-red-500/20 text-sm outline-none"
                  />
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedCategory}
                  className={`w-full h-14 rounded-2xl font-bold mt-4 flex gap-2 ${!selectedCategory ? "bg-stone-200" : "bg-stone-950 hover:bg-stone-800 text-white"}`}
                >
                  <Send size={18} /> Kirim Tiket Support
                </Button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}