"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/ai-badge";
import {
  Star, MapPin, ShieldCheck,
  ChevronLeft, ShoppingCart, Info,
  Flame, Leaf, Timer,
  User
} from "lucide-react";
import Link from "next/link";
import CartDrawer from "@/components/cart-drawer";

export default function DetailProdukPage() {
  const [ulasanList, setUlasanList] = useState([
    { id: 1, nama: "Budi Santoso", rating: 5, komentar: "Kualitas cabainya sangat segar, pengiriman cepat!" },
  ]);
  const [ratingBaru, setRatingBaru] = useState(0);
  const [namaBaru, setNamaBaru] = useState("");
  const [komentarBaru, setKomentarBaru] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleTambahUlasan = () => {
    if (!namaBaru || !komentarBaru || ratingBaru === 0) return;
    const ulasanBaru = { id: Date.now(), nama: namaBaru, rating: ratingBaru, komentar: komentarBaru };
    setUlasanList([ulasanBaru, ...ulasanList]);
    setNamaBaru(""); setKomentarBaru(""); setRatingBaru(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-4">
      {/* Back Button */}
      <Link href="/dashboard/riset" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all font-bold text-xs uppercase tracking-widest">
        <ChevronLeft size={16} /> Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kolom Kiri: Galeri Foto */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-[3rem] relative overflow-hidden group">
            <img src="/images/red-chili.png" alt="Rawit Merah Presto" className="w-full h-full object-cover" />
            <Badge className="absolute top-6 left-6 bg-background/90 text-red-600 dark:text-red-400 border-none px-4 py-2 rounded-xl font-bold">
              Kualitas Super (Grade A)
            </Badge>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-2xl border-2 border-transparent hover:border-red-500 cursor-pointer overflow-hidden">
                <img src="/images/red-chili.png" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Informasi & Transaksi */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
              <Star size={16} fill="currentColor" />
              <span className="font-bold text-sm">4.9</span>
            </div>
            <h1 className="text-5xl font-serif font-bold text-foreground leading-tight">
              Rawit Merah Presto <br /> <span className="text-red-600 dark:text-red-400">Kediri Premium</span>
            </h1>
          </div>

          <div className="p-8 bg-secondary rounded-[2.5rem] space-y-4 border border-border">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Harga Partai Besar</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">Rp 42.000</span>
              <span className="text-muted-foreground font-medium">/ Kilogram</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[ {icon: Flame, label: "Level Pedas", val: "Tinggi"}, {icon: Leaf, label: "Kesegaran", val: "Baru"}, {icon: Timer, label: "Daya Simpan", val: "7-10 Hari"} ].map((s, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-2xl text-center">
                <s.icon size={20} className="mx-auto mb-1 text-primary" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase">{s.label}</p>
                <p className="text-xs font-bold">{s.val}</p>
              </div>
            ))}
          </div>

          <Button onClick={() => setIsCartOpen(true)} className="w-full h-14 bg-foreground text-background rounded-2xl text-lg hover:bg-primary transition-all">
            <ShoppingCart size={20} className="mr-2" /> Tambah ke Keranjang
          </Button>
        </div>
      </div>

      <hr className="border-border" />

      {/* Deskripsi Lengkap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-2xl font-serif font-bold">Tentang Produk Ini</h3>
          <p className="text-muted-foreground leading-relaxed">
            Cabai Rawit Merah Presto dari Kediri dikenal dengan kulitnya yang mengkilap dan tingkat kepedasan yang konsisten.
          </p>
        </div>
        <Card className="p-8 border-none bg-red-900/10 rounded-[2.5rem] space-y-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
            <Info size={18} /> Info Pengiriman
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed font-medium">
            Pengiriman menggunakan armada berpendingin (Cold Storage).
          </p>
        </Card>
      </div>

      {/* Ulasan Section */}
      <div className="space-y-8">
        <h3 className="text-3xl font-serif font-bold">Ulasan ({ulasanList.length})</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="p-8 border border-border rounded-[2.5rem] bg-card space-y-5">
            <input value={namaBaru} onChange={(e) => setNamaBaru(e.target.value)} placeholder="Nama Anda" className="w-full p-4 rounded-xl border border-border bg-background" />
            <Button onClick={handleTambahUlasan} className="w-full">Kirim Ulasan</Button>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {ulasanList.map((item) => (
              <div key={item.id} className="p-6 border-b border-border flex gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><User size={20} /></div>
                <div>
                  <p className="font-bold">{item.nama}</p>
                  <p className="text-muted-foreground text-sm">{item.komentar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}