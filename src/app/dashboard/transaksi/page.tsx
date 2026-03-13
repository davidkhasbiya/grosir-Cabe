"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, CheckCircle2, Clock, ChevronRight, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  tgl: string;
  produk: string;
  total: string;
  status: string;
  kurir: string;
  estimasi: string;
  color: string;
}

export default function RiwayatPesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    { id: "TRX-99012", tgl: "08 Mar 2026", produk: "Rawit Merah Presto", total: "Rp 50.400.000", status: "Dikirim", kurir: "Mitra Logistik - AG 1234 XX", estimasi: "Tiba dalam 4 jam", color: "bg-blue-600" },
    { id: "TRX-98955", tgl: "05 Mar 2026", produk: "Cabai Hijau Besar", total: "Rp 12.000.000", status: "Selesai", kurir: "Self Pickup", estimasi: "Diterima oleh Budi", color: "bg-emerald-600" },
    { id: "TRX-98821", tgl: "01 Mar 2026", produk: "Cabai Keriting", total: "Rp 25.500.000", status: "Diproses", kurir: "Menunggu Penjemputan", estimasi: "-", color: "bg-orange-600" }
  ];

  const tabs = ["Semua", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];
  const filteredOrders = orders.filter(o => activeTab === "Semua" ? true : o.status === activeTab);

  return (
    // bg-background dan text-foreground adalah kunci agar otomatis berubah warna
    <div className="space-y-8 animate-in fade-in duration-500 bg-background min-h-screen p-6 text-foreground">
      <div>
        <h1 className="text-4xl font-serif font-bold text-foreground">Riwayat Pesanan</h1>
        <p className="text-muted-foreground text-sm mt-1">Pantau status distribusi komoditas kamu secara real-time.</p>
      </div>

      {/* Tabs Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border border-transparent",
              activeTab === tab 
                ? "bg-primary text-primary-foreground shadow-lg" 
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            // bg-card dan border-border mengikuti tema sistem
            <Card key={order.id} className="p-8 overflow-hidden border-border bg-card shadow-sm rounded-[2.5rem]">
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", order.color)}>
                    {order.status === "Dikirim" ? <Truck size={24} /> : order.status === "Selesai" ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">{order.id}</p>
                    <h3 className="font-bold text-lg text-card-foreground">{order.produk}</h3>
                  </div>
                </div>
                <div className="bg-secondary px-3 py-1 rounded-lg text-xs font-bold text-muted-foreground">
                  {order.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-y border-border">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Total Transaksi</p>
                  <p className="font-bold text-xl text-card-foreground">{order.total}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Logistik</p>
                  <p className="text-sm font-bold text-muted-foreground">{order.kurir}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Status Terakhir</p>
                  <p className="text-sm font-bold text-destructive">{order.estimasi}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-6">
                <Button onClick={() => setSelectedOrder(order)} className="rounded-2xl bg-foreground text-background hover:bg-foreground/90 px-6 font-bold">
                  Detail Pelacakan <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-20 text-center text-muted-foreground italic">Tidak ada pesanan dengan status ini.</div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-[3rem] w-full max-w-2xl p-8 shadow-2xl relative">
              <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-destructive">Pelacakan Pesanan</h2>
              <p className="text-muted-foreground text-sm mb-6 uppercase font-bold tracking-widest">{selectedOrder.id}</p>
              
              <div className="w-full h-64 bg-secondary rounded-3xl mb-8 flex items-center justify-center border border-border">
                 <p className="text-muted-foreground text-sm">Visualisasi Peta (GPS)</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}