"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SupportModal from "@/components/SupportModal";
import {
  User, Lock, Bell, Globe, Shield,
  CreditCard, MapPin, Moon, Sun,
  Smartphone, Save, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("Profil");
  const [isSaving, setIsSaving] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const menuCategories = [
    { id: "Profil", label: "Informasi Pribadi", icon: <User size={20} />, desc: "Nama, foto, dan bio publik" },
    { id: "Keamanan", label: "Login & Keamanan", icon: <Lock size={20} />, desc: "Password dan 2-faktor" },
    { id: "Notifikasi", label: "Pusat Notifikasi", icon: <Bell size={20} />, desc: "Email dan push alert" },
    { id: "Tampilan", label: "Tampilan & Bahasa", icon: <Globe size={20} />, desc: "Mode gelap dan bahasa" },
    { id: "Pembayaran", label: "Metode Pembayaran", icon: <CreditCard size={20} />, desc: "Kartu dan saldo" },
    { id: "Alamat", label: "Alamat & Distribusi", icon: <MapPin size={20} />, desc: "Lokasi gudang utama" },
    { id: "Privasi", label: "Privasi Data", icon: <Shield size={20} />, desc: "Kontrol visibilitas data" },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Pengaturan sistem berhasil diperbarui!");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-4 md:p-10 animate-in fade-in duration-1000 bg-background text-foreground min-h-screen">
      <aside className="w-full lg:w-80 space-y-6">
        <div className="bg-card p-6 rounded-[2.5rem] border border-border shadow-sm">
          <h2 className="text-xl font-black px-4 mb-6 tracking-tight">System Settings</h2>
          <nav className="space-y-1">
            {menuCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn("w-full text-left p-4 rounded-2xl transition-all duration-300 group",
                  activeTab === item.id ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:bg-secondary")}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("transition-colors", activeTab === item.id ? "text-background" : "text-destructive")}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-none">{item.label}</p>
                    <p className={cn("text-[10px] mt-1 opacity-70", activeTab === item.id ? "text-background" : "text-muted-foreground")}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-secondary p-6 rounded-[2.5rem] border border-border">
          <p className="text-xs font-bold text-destructive uppercase tracking-widest mb-2">Butuh Bantuan?</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Hubungi tim teknis kami jika Anda mengalami kesulitan dalam pengaturan akun.</p>
          <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
          <Button variant="link" className="p-0 text-destructive font-bold h-auto" onClick={() => setIsSupportOpen(true)}>
            Buka Tiket Support →
          </Button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-black tracking-tight">{activeTab}</h1>
            <p className="text-muted-foreground text-sm font-medium mt-1 italic">Konfigurasikan sistem sesuai kebutuhan operasional Anda.</p>
          </div>
          <Button disabled={isSaving} onClick={handleSave} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl px-8 h-12 font-bold shadow-lg flex gap-2">
            {isSaving ? "Menyimpan..." : <><Save size={18} /> Simpan Semua</>}
          </Button>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
            {activeTab === "Profil" && (
              <Card className="p-8 border-border rounded-[3rem] bg-card shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="relative">
                    <div className="w-24 h-24 bg-secondary rounded-[2rem] flex items-center justify-center text-muted-foreground">
                      <User size={40} />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-foreground text-background p-2 rounded-xl border-4 border-background"><Smartphone size={14} /></button>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Nama Lengkap</label>
                        <Input defaultValue="Budi Santoso" className="rounded-xl border-border bg-background h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Username</label>
                        <Input defaultValue="@budicabai" className="rounded-xl border-border bg-background h-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === "Tampilan" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  onClick={() => setTheme("light")}
                  className={cn(
                    "p-8 border-border rounded-[3rem] bg-card shadow-sm cursor-pointer transition-all hover:ring-2 ring-destructive",
                    theme === "light" && "ring-2 ring-destructive"
                  )}
                >
                  <Sun className="text-destructive mb-4" size={32} />
                  <h3 className="font-bold text-lg text-foreground">Mode Terang</h3>
                  <p className="text-xs text-muted-foreground mt-1">Standar tampilan bersih dan cerah.</p>
                </Card>

                <Card
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "p-8 border-border rounded-[3rem] bg-card shadow-sm cursor-pointer transition-all hover:ring-2 ring-destructive",
                    theme === "dark" && "ring-2 ring-destructive"
                  )}
                >
                  <Moon className="text-destructive mb-4" size={32} />
                  <h3 className="font-bold text-lg text-foreground">Mode Gelap</h3>
                  <p className="text-xs text-muted-foreground mt-1">Nyaman untuk mata di malam hari.</p>
                </Card>
              </div>
            )}

            {["Keamanan", "Pembayaran", "Alamat", "Privasi"].includes(activeTab) && (
              <div className="h-64 border-4 border-dashed border-border rounded-[3rem] flex flex-col items-center justify-center text-muted-foreground">
                <Shield size={48} className="mb-4 opacity-20" />
                <p className="font-bold italic">Modul ini sedang dikonfigurasi...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}