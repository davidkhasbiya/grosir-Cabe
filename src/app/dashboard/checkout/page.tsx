"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("va");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [address, setAddress] = useState({
    name: "Gudang Utama - Budi Santoso",
    phone: "+62 812-3456-7890",
    detail: "Jl. Industri No. 45, Kawasan Pergudangan Jaya, Jakarta Pusat"
  });
  const [tempAddress, setTempAddress] = useState(address);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-stone-200 p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/dashboard/overview" className="flex items-center gap-2 text-stone-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
            <ChevronLeft size={16} /> Kembali ke Dashboard
          </Link>
        </div>

        {/* Grid Layout Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Kolom Kiri: Form (Makan 2 kolom) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1a1a1a] p-8 rounded-[2rem] border border-stone-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs">1</span>
                Alamat Pengiriman
              </h2>
              <p className="font-bold text-white">{address.name}</p>
              <p className="text-stone-400 text-sm mt-1">{address.detail}</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsEditingAddress(true)}>Ubah Alamat</Button>
            </div>

            <div className="bg-[#1a1a1a] p-8 rounded-[2rem] border border-stone-800">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs">2</span>
                Metode Pembayaran
              </h2>
              <div 
                className="p-4 rounded-xl bg-[#252525] border border-stone-700 flex justify-between items-center cursor-pointer hover:border-red-600 transition-colors"
                onClick={() => setPaymentMethod(paymentMethod === "va" ? "" : "va")}
              >
                <span className="font-bold">Transfer Bank (VA)</span>
                <ChevronDown size={18} className={cn("transition-transform", paymentMethod === "va" && "rotate-180")} />
              </div>
              {paymentMethod === "va" && (
                <div className="grid grid-cols-4 gap-2 mt-4 animate-in slide-in-from-top-2">
                  {["BCA", "Mandiri", "BNI", "BRI"].map((b) => (
                    <button key={b} className="py-3 rounded-lg bg-[#0f0f0f] border border-stone-700 hover:border-red-600 font-bold text-sm">{b}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan (KELUARKAN DARI DIV KOLOM KIRI) */}
          <aside className="lg:col-span-1">
            <div className="bg-[#1a1a1a] p-8 rounded-[2rem] border border-stone-800 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-red-500">Ringkasan</h3>
              <div className="space-y-3 text-sm border-b border-stone-800 pb-6 mb-6">
                <div className="flex justify-between text-stone-400"><span>Total Pesanan</span><span>Rp 50.000.000</span></div>
              </div>
              <div className="flex justify-between font-bold text-white text-lg">
                <span>Total</span><span>Rp 50.400.000</span>
              </div>
              <Button onClick={() => setShowSuccess(true)} className="w-full mt-8 h-14 bg-red-600 hover:bg-red-700 rounded-xl font-bold">
                Bayar Sekarang
              </Button>
            </div>
          </aside>
        </div>
      </div>

      {/* Modals tetap di bawah */}
      {isEditingAddress && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <Card className="bg-[#1a1a1a] border-stone-800 p-10 rounded-[2rem] max-w-lg w-full">
            <h2 className="text-xl font-bold mb-6 text-white">Ubah Alamat</h2>
            <input className="w-full p-4 mb-4 rounded-xl bg-[#0f0f0f] border border-stone-700 text-white" value={tempAddress.name} onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })} />
            <Button className="w-full bg-red-600" onClick={() => { setAddress(tempAddress); setIsEditingAddress(false); }}>Simpan</Button>
          </Card>
        </div>
      )}
    </div>
  );
}