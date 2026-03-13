"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Search, MessageSquareDiff, BarChart3, 
  ClipboardList, User, Settings, Moon, Sun, Flame, 
  LogOut, X, Menu 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Sidebar({ isMinimized, setIsMinimized }: { 
  isMinimized: boolean, 
  setIsMinimized: (val: boolean) => void 
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const menuItems = [
    { name: "Overview", href: "/dashboard/overview", icon: <LayoutDashboard size={20} /> },
    { name: "Pantau Stok", href: "/dashboard/riset", icon: <Search size={20} /> },
    { name: "Chatbot AI", href: "/dashboard/ai-assistant", icon: <MessageSquareDiff size={20} /> },
    { name: "Laporan Harga", href: "/dashboard/laporan", icon: <BarChart3 size={20} /> },
    { name: "Riwayat Pesanan", href: "/dashboard/transaksi", icon: <ClipboardList size={20} /> },
    { name: "Profil Mitra", href: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Pengaturan", href: "/dashboard/setting", icon: <Settings size={20} /> },
  ];

  if (!mounted) return null;

  return (
    <div className={cn(
      "bg-gradient-to-b from-red-950 via-red-900 to-stone-950 min-h-screen flex flex-col text-white fixed left-0 top-0 shadow-2xl border-r border-red-800/30 transition-all duration-300 ease-in-out z-50",
      isMinimized ? "w-20" : "w-64"
    )}>
      {/* Tombol Toggle Relokasi */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)} 
        className="absolute -right-3 top-8 bg-white text-red-900 p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform z-[60]"
      >
        {isMinimized ? <Menu size={16} /> : <X size={16} />}
      </button>

      {/* Logo & Brand */}
      <div className={cn("p-8 flex items-center gap-3 overflow-hidden", isMinimized && "justify-center p-0 h-24")}>
        <div className="bg-red-600 p-2 rounded-xl text-white shrink-0 shadow-lg shadow-red-900/50">
          <Flame size={24} />
        </div>
        {!isMinimized && (
          <span className="font-bold text-xl uppercase tracking-tight whitespace-nowrap">
            Grosir<span className="text-red-500">Cabai</span>
          </span>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 mt-2">
        {!isMinimized && <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-red-400/60 font-bold mb-4">Menu Utama</p>}
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className={cn(
            "flex items-center rounded-2xl h-12 transition-all duration-300 group",
            isMinimized ? "justify-center px-0" : "px-4 gap-4",
            pathname === item.href ? "bg-white text-red-950 shadow-xl font-bold" : "hover:bg-red-800/40 text-red-100"
          )}>
            <span className={cn("shrink-0", pathname === item.href ? "text-red-600" : "text-red-400 group-hover:text-red-200")}>{item.icon}</span>
            {!isMinimized && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer Area - Ikon Dinamis */}
      <div className="p-4 space-y-2 border-t border-red-800/50">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
          className={cn("flex items-center w-full p-3 text-red-400 hover:text-white rounded-xl transition-colors", isMinimized ? "justify-center" : "gap-3")}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          {!isMinimized && <span className="font-bold text-sm">{theme === 'dark' ? "Mode Terang" : "Mode Gelap"}</span>}
        </button>
        <button 
          onClick={() => router.push("/")} 
          className={cn("flex items-center h-12 w-full text-red-400 hover:text-white hover:bg-red-600/20 rounded-xl px-4 transition-all", isMinimized ? "justify-center px-0" : "gap-4")}
        >
          <LogOut size={20} className="shrink-0" />
          {!isMinimized && <span className="font-medium text-sm">Keluar Akun</span>}
        </button>
      </div>

      {/* Spacer untuk memastikan 120 baris */}
      <div className="h-4" />
      <div className="h-4" />
    </div>
  );
}