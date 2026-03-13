"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrendingDown, TrendingUp, Search, ArrowUpRight, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LaporanHargaPage() {
   const [searchTerm, setSearchTerm] = useState("");

  const dataHarga = [
    { produk: "Rawit Merah", harga: "42.000", tren: "turun", selisih: "-2.000", wilayah: "Kediri, Jatim" },
    { produk: "Merah Keriting", harga: "31.500", tren: "naik", selisih: "+1.500", wilayah: "Cianjur, Jabar" },
    { produk: "Hijau Besar", harga: "22.000", tren: "stabil", selisih: "0", wilayah: "Brebes, Jateng" },
    { produk: "Rawit Hijau", harga: "28.000", tren: "naik", selisih: "+500", wilayah: "Magelang, Jateng" },
    { produk: "Cabai Keriting", harga: "33.000", tren: "turun", selisih: "-1.000", wilayah: "Medan, Sumut" },
    { produk: "Cabai Gendot", harga: "45.000", tren: "naik", selisih: "+2.000", wilayah: "Bandung, Jabar" },
  ];

  const filteredData = dataHarga.filter((item) => 
    item.produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.wilayah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Gunakan 'bg-background' dan 'text-foreground' agar mengikuti tema sistem
    <div className="space-y-8 animate-in fade-in duration-700 bg-background min-h-screen p-6 text-foreground">
      
      {/* Header & Market Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Rata-rata Harga", val: "Rp 32.500", sub: "Stabil (+0.2%)" },
          { title: "Komoditas Top", val: "Rawit Merah", sub: "Naik 4.8% hari ini" },
          { title: "Volume Stok", val: "1.250 Ton", sub: "Tersedia di 12 titik" }
        ].map((item, i) => (
          // Gunakan 'bg-card' dan 'border-border'
          <Card key={i} className="p-6 rounded-[2rem] border border-border bg-card shadow-sm">
            <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-2">{item.title}</p>
            <h3 className="text-2xl font-bold">{item.val}</h3>
            <p className="text-emerald-500 text-xs mt-2 flex items-center gap-1 font-bold"><ArrowUpRight size={14} />{item.sub}</p>
          </Card>
        ))}
      </div>

      {/* Search Bar */}
      {/* Gunakan 'bg-card' agar tetap terlihat jelas di kedua mode */}
      <div className="bg-card p-4 rounded-3xl border border-border shadow-sm flex items-center gap-4">
        <Search className="text-muted-foreground ml-2" size={20} />
        <Input 
          placeholder="Cari komoditas atau daerah..." 
          className="h-12 border-none bg-transparent text-lg focus-visible:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredData.map((item) => (
            <motion.div 
              key={item.produk}
              className="bg-card p-6 rounded-[2.5rem] border border-border shadow-sm flex items-center justify-between group"
            >
              <div className="flex gap-4 items-center">
                {/* Warna ikon tetap terjaga dengan utility class */}
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", 
                  item.tren === 'naik' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500')}>
                  {item.tren === 'naik' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                </div>
                <div>
                  <p className="font-bold">{item.produk}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.wilayah}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-lg">Rp {item.harga}</p>
                <p className={cn("text-xs font-bold", item.tren === 'naik' ? 'text-red-500' : 'text-emerald-500')}>{item.selisih}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}