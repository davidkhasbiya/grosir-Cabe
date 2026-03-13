"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, ShoppingBag, DollarSign, Package, AlertTriangle } from "lucide-react";
import PriceTrendChart from "@/components/PriceTrendChart";

export default function OverviewPage() {
  const stats = [
    { label: "Total Penjualan", value: "Rp 12.500.000", icon: <DollarSign size={24} className="text-emerald-600" /> },
    { label: "Pesanan Aktif", value: "14", icon: <ShoppingBag size={24} className="text-blue-600" /> },
    { label: "Stok Tersedia", value: "852 Kg", icon: <Package size={24} className="text-amber-600" /> },
    { label: "Tren Harga", value: "+5.2%", icon: <TrendingUp size={24} className="text-red-600" /> },
  ];

  const currentPrice = 52000;
  const AMBANG_BATAS = 50000;

  const cekHarga = (harga: number) => {
    if (harga >= AMBANG_BATAS) {
      return (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl animate-bounce mb-4 border border-red-200 dark:border-red-900">
          <AlertTriangle size={16} />
          <span className="text-[10px] font-bold uppercase">Harga Melebihi Batas Wajar!</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-background min-h-screen p-8">
      {/* 1. Baris Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-card border-border shadow-sm rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-xs font-bold uppercase">{stat.label}</p>
                <h3 className="text-xl font-bold text-foreground mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-secondary rounded-xl">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* 2. Area Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri */}
        <Card className="lg:col-span-2 p-6 bg-card border-border shadow-sm rounded-2xl">
          <h2 className="font-bold text-foreground mb-6">Riwayat Pesanan Terbaru</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary font-bold border border-border">#0{i + 1}</div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Pesanan Cabai Merah</p>
                    <p className="text-[11px] text-muted-foreground">10 Maret 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">Rp 450.000</p>
                  <p className="text-[10px] uppercase font-bold text-emerald-600">Selesai</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 border-none shadow-sm rounded-2xl bg-gradient-to-br from-red-600 to-red-800 dark:from-red-950 dark:to-red-900 text-white">
            <h2 className="font-bold mb-4 opacity-90">Ringkasan Harga Pasar</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-red-700 pb-2"><span>Cabai Merah</span> <span className="font-bold">Rp 32k</span></div>
              <div className="flex justify-between border-b border-red-700 pb-2"><span>Cabai Rawit</span> <span className="font-bold">Rp 45k</span></div>
              <div className="flex justify-between"><span>Tomat</span> <span className="font-bold">Rp 12k</span></div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border shadow-sm rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Analitik Tren Harga</p>
            {cekHarga(currentPrice)}
            <PriceTrendChart />
          </Card>
        </div>
      </div>
    </div>
  );
}