"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/ai-badge";
import { 
  User, MapPin, Building2, Save, Bell, Lock, 
  CreditCard, LogOut, Camera, Plus, Smartphone, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profil");
  const [isSaving, setIsSaving] = useState(false);

  const sidebarMenu = [
    { name: "Profil", icon: <User size={20} /> },
    { name: "Keamanan", icon: <Lock size={20} /> },
    { name: "Alamat Gudang", icon: <MapPin size={20} /> },
    { name: "Pembayaran", icon: <CreditCard size={20} /> },
    { name: "Notifikasi", icon: <Bell size={20} /> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Perubahan berhasil disimpan!");
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profil":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="p-8 border-border rounded-[3rem] bg-card shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Building2 size={20} className="text-destructive"/> Informasi Bisnis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Nama Bisnis</label>
                  <Input defaultValue="CV. Cabai Jaya" className="rounded-2xl border-border bg-background h-14" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">NIB</label>
                  <Input defaultValue="912000123456" className="rounded-2xl border-border bg-background h-14" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Bio Bisnis</label>
                  <Input defaultValue="Penyedia cabai segar kualitas ekspor sejak 2015." className="rounded-2xl border-border bg-background h-14" />
                </div>
              </div>
            </Card>
          </motion.div>
        );

      case "Keamanan":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="p-8 border-border rounded-[3rem] bg-card shadow-sm">
              <h3 className="text-lg font-bold mb-6">Autentikasi Dua Faktor (2FA)</h3>
              <div className="flex items-center justify-between p-6 bg-secondary rounded-3xl border border-border">
                <div className="flex gap-4">
                  <Smartphone className="text-primary" />
                  <div>
                    <p className="font-bold text-foreground">SMS Verification Aktif</p>
                    <p className="text-xs text-muted-foreground">+62 812 **** 7890</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl font-bold">Ubah</Button>
              </div>
            </Card>
          </motion.div>
        );

      case "Alamat Gudang":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <h3 className="text-xl font-bold">Daftar Gudang</h3>
              <Button className="rounded-2xl bg-foreground text-background gap-2"><Plus size={18}/> Tambah</Button>
            </div>
            <Card className="p-6 border-border rounded-[2.5rem] bg-card shadow-sm flex justify-between items-center">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive"><MapPin size={24}/></div>
                <div>
                  <p className="font-bold">Gudang Kramat Jati</p>
                  <p className="text-sm text-muted-foreground">Jakarta Timur, DKI Jakarta</p>
                </div>
              </div>
              <Badge className="bg-destructive text-destructive-foreground">Utama</Badge>
            </Card>
          </motion.div>
        );

      case "Pembayaran":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="h-48 rounded-[2rem] bg-primary p-8 text-primary-foreground relative overflow-hidden shadow-lg">
                  <div className="flex justify-between"><CreditCard size={32} /> <p className="font-bold italic text-xl">VISA</p></div>
                  <div className="mt-10"><p className="text-lg tracking-[0.2em] font-mono">**** **** **** 8890</p></div>
               </div>
               <button className="h-48 rounded-[2rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary transition-all">
                  <Plus size={32} className="mb-2" />
                  <p className="font-bold">Tambah Metode</p>
               </button>
            </div>
          </motion.div>
        );

      case "Notifikasi":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {["Update Harga Harian", "Status Pengiriman", "Promo & Keuntungan"].map((label, i) => (
              <Card key={i} className="p-6 border-border rounded-3xl bg-card shadow-sm flex items-center justify-between">
                <p className="font-bold text-foreground">{label}</p>
                <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer"><div className="w-4 h-4 bg-background rounded-full ml-auto" /></div>
              </Card>
            ))}
          </motion.div>
        );

      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 p-4 md:p-8 bg-background min-h-screen text-foreground">
      <aside className="w-full lg:w-80 space-y-6">
        <div className="bg-card p-8 rounded-[3rem] border border-border shadow-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center text-primary-foreground text-3xl font-bold mb-4 shadow-lg">B</div>
            <h2 className="font-black text-xl">Budi Santoso</h2>
            <Badge className="mt-2">Premium Partner</Badge>
          </div>
          <nav className="space-y-2">
            {sidebarMenu.map((item) => (
              <button key={item.name} onClick={() => setActiveTab(item.name)} 
                className={cn("w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all",
                activeTab === item.name ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:bg-secondary")}>
                {item.icon} {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-serif font-black tracking-tight">{activeTab}</h1>
            <p className="text-muted-foreground mt-2">Pengaturan akun & sistem Anda.</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-destructive text-destructive-foreground rounded-[1.5rem] px-10 h-14 font-bold shadow-lg">
            {isSaving ? "Menyimpan..." : <><Save size={20} className="mr-2" /> Simpan Perubahan</>}
          </Button>
        </div>
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
    </div>
  );
}