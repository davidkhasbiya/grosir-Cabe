"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Flame, ChevronRight, X, Star, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const produkData = [
  { id: 1, nama: "Cabai Merah Keriting", harga: "Rp 45.000", stok: 12, rating: 4.8, terjual: "1.2rb+", deskripsi: "Varian premium dengan rasa pedas sedang yang khas. Kualitas super, petik segar langsung dari kebun petani lokal." },
  { id: 2, nama: "Cabai Rawit Merah", harga: "Rp 50.000", stok: 5, rating: 4.9, terjual: "2.5rb+", deskripsi: "Cabai dengan tingkat kepedasan tinggi. Diproses dengan standar kebersihan ketat, sangat cocok untuk industri kuliner." },
  { id: 3, nama: "Cabai Hijau Besar", harga: "Rp 35.000", stok: 45, rating: 4.7, terjual: "800+", deskripsi: "Memiliki tekstur renyah dengan rasa yang tidak terlalu pedas. Sangat segar, disortir untuk memastikan ukuran seragam." },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduk, setSelectedProduk] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [activeNotif, setActiveNotif] = useState({ user: "", action: "" });
  const router = useRouter();

  useEffect(() => {
    // Simulasi Loading Skeleton
    const timer = setTimeout(() => setIsLoading(false), 1200);

    // Simulasi Social Proof Notification
    const notifications = [
      { user: "Mitra Jawa Tengah", action: "baru saja memborong 100kg Cabai Rawit" },
      { user: "PT. Sambal Nusantara", action: "mengunci kontrak pengiriman mingguan" },
      { user: "Supermarket Fresh", action: "memberikan rating bintang 5 ⭐" },
    ];

    const interval = setInterval(() => {
      setActiveNotif(notifications[Math.floor(Math.random() * notifications.length)]);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 5000);
    }, 12000);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const filteredProduk = produkData.filter((p) => p.nama.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="light min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-red-100">
      {/* Navbar Pro */}
      <nav className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-xl text-white shadow-lg shadow-red-200">
            <Flame size={22} fill="currentColor" />
          </div>
          <h1 className="text-xl font-black tracking-tighter italic">GROSIR<span className="text-red-600">CABAI</span></h1>
        </div>
        
        <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-5 py-2 w-1/3 border border-transparent focus-within:border-red-300 focus-within:bg-white transition-all">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari harga cabai hari ini..." 
            className="bg-transparent border-none outline-none px-3 w-full text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <Link href="/auth/login" className="text-sm font-bold text-slate-600 hover:text-red-600 transition-colors">Jadi Mitra</Link>
          <Button onClick={() => router.push("/auth/login")} className="rounded-full bg-slate-600 px-6 font-bold shadow-xl shadow-slate-200 hover:bg-red-600">Masuk</Button>
        </div>
      </nav>

      {/* Hero Content */}
      <header className="py-20 text-center px-6 relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-100/50 blur-[120px] -z-10 rounded-full" />
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-6 shadow-sm animate-bounce">
          <TrendingUp size={16} className="text-green-500" />
          <span className="text-xs font-bold text-slate-700">Harga stabil hari ini di Malang & Kediri</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          Suplai Cabai Segar <br/><span className="text-red-600 underline decoration-red-200 underline-offset-8">Tanpa Perantara.</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg font-medium">
          Hubungkan bisnis Anda langsung dengan jaringan petani terbaik. Transparan, cepat, dan kualitas grade A yang sudah tersertifikasi.
        </p>
      </header>

      {/* Katalog - Skeleton Logic */}
      <section className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <div className="w-2 h-8 bg-red-600 rounded-full" /> Rekomendasi Untuk Anda
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-6 animate-pulse shadow-sm">
                <div className="bg-slate-100 h-48 rounded-3xl mb-4" />
                <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-3" />
                <div className="h-4 bg-slate-100 rounded-full w-1/2" />
              </div>
            ))
          ) : (
            filteredProduk.map((item) => (
              <div key={item.id} className="group bg-white border border-slate-100 rounded-[2.5rem] p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
                {item.stok < 10 && (
                  <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">STOK HAMPIR HABIS</div>
                )}
                <div className="bg-slate-50 h-52 rounded-3xl mb-5 flex items-center justify-center relative overflow-hidden group-hover:bg-red-50 transition-colors">
                  <img src="/images/red-chili.png" className="h-40 object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-slate-700">{item.rating}</span>
                  <span className="text-xs text-slate-400 ml-1">| Terjual {item.terjual}</span>
                </div>
                <h4 className="font-bold text-xl mb-1 text-slate-900">{item.nama}</h4>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Harga /kg</p>
                    <p className="text-2xl font-black text-red-600">{item.harga}</p>
                  </div>
                  <Button onClick={() => setSelectedProduk(item)} className="rounded-xl bg-slate-100 text-slate-900 hover:bg-red-600 hover:text-white border-none shadow-none">Detail</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Floating Notification */}
      <div className={cn(
        "fixed bottom-8 left-8 z-[200] bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-4 transition-all duration-700 transform",
        showNotif ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0 pointer-events-none"
      )}>
        <div className="bg-red-600 text-white p-2 rounded-xl shadow-lg shadow-red-200">
          <ShieldCheck size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black text-slate-900">{activeNotif.user}</span>
          <span className="text-[10px] text-slate-500 font-medium">{activeNotif.action}</span>
        </div>
        <button onClick={() => setShowNotif(false)} className="ml-4 text-slate-300 hover:text-slate-900 transition-colors"><X size={14}/></button>
      </div>

      {/* Footer Pro */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 mt-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 font-medium">
          <div className="col-span-1 md:col-span-1">
             <h4 className="font-black text-lg mb-6 tracking-tighter">GROSIR<span className="text-red-600">CABAI</span></h4>
             <p className="text-slate-400 text-sm leading-relaxed">Platform distribusi cabai terbesar di Indonesia yang menjamin harga petani untuk kesuksesan bisnis Anda.</p>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-slate-900">Perusahaan</h5>
            <ul className="text-slate-500 text-sm space-y-3">
              <li className="hover:text-red-600 cursor-pointer transition-colors">Tentang Kami</li>
              <li className="hover:text-red-600 cursor-pointer transition-colors">Karir</li>
              <li className="hover:text-red-600 cursor-pointer transition-colors">Hubungi Kami</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-slate-900">Layanan</h5>
            <ul className="text-slate-500 text-sm space-y-3">
              <li className="hover:text-red-600 cursor-pointer transition-colors">Program Mitra</li>
              <li className="hover:text-red-600 cursor-pointer transition-colors">Logistik Terpadu</li>
              <li className="hover:text-red-600 cursor-pointer transition-colors">Edukasi Petani</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <h5 className="font-bold mb-2 text-slate-900">Butuh Bantuan?</h5>
            <p className="text-xs text-slate-400 mb-4">CS kami aktif 24/7 untuk mitra</p>
            <Button className="w-full bg-red-600 rounded-xl font-bold">Chat WhatsApp</Button>
          </div>
        </div>
      </footer>

      {/* PopUp Detail Pro */}
      {selectedProduk && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-6">
          <div className="bg-white rounded-[3rem] p-8 max-w-lg w-full relative shadow-2xl animate-in fade-in zoom-in duration-300 border border-white">
            <button onClick={() => setSelectedProduk(null)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all">✕</button>
            <div className="bg-red-50 h-64 rounded-[2rem] mb-6 flex items-center justify-center relative">
               <img src="/images/red-chili.png" className="h-48 object-contain z-10" />
               <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-red-600 border border-red-100">STOK READY</div>
            </div>
            <h3 className="text-3xl font-black mb-2 text-slate-900">{selectedProduk.nama}</h3>
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold">{selectedProduk.rating} Rating</span>
              <span className="text-slate-200">|</span>
              <span className="text-xs font-bold text-green-600">Terjual {selectedProduk.terjual}</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">{selectedProduk.deskripsi}</p>
            <Button onClick={() => router.push("/auth/login")} className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-red-600 transition-all shadow-xl shadow-slate-200">BORONG SEKARANG</Button>
          </div>
        </div>
      )}
    </div>
  );
}