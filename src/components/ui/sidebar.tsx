"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  ShoppingCart, 
  User, 
  LogOut,
  Zap 
} from "lucide-react";
import { cn } from "@/lib/utils"; // Fungsi bawaan shadcn untuk gabung class

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
    { name: "Riset Produk", href: "/dashboard/riset", icon: Search },
    { name: "Laporan Penjualan", href: "/dashboard/laporan", icon: FileText },
    { name: "Transaksi", href: "/dashboard/transaksi", icon: ShoppingCart },
  ];

  return (
    <div className="w-64 h-screen bg-[#1B4D3E] text-white flex flex-col p-6 shadow-xl">
      {/* Logo Kasir.id sesuai image_7ec558.jpg */}
      <div className="flex items-center gap-2 mb-12 px-2">
        <Zap className="text-emerald-400 fill-emerald-400" size={24} />
        <span className="text-xl font-bold tracking-tight">Kasir.id</span>
      </div>

      {/* Menu Section */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-emerald-200/50 uppercase tracking-wider mb-4 px-2">
          Menu
        </p>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-white text-[#1B4D3E] shadow-lg" 
                    : "hover:bg-emerald-800/50 text-emerald-100"
                )}
              >
                <item.icon size={20} className={isActive ? "text-[#1B4D3E]" : "text-emerald-300 group-hover:text-white"} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Menu AI Assistant (Tambahan untuk Hackathon) */}
          <Link
            href="/dashboard/ai-insight"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl mt-4 border border-emerald-500/30 bg-emerald-900/30 hover:bg-emerald-800 transition-all",
              pathname === "/dashboard/ai-insight" ? "bg-emerald-500 text-white" : "text-emerald-200"
            )}
          >
            <Zap size={20} className="text-yellow-400 fill-yellow-400" />
            <span className="font-medium italic">AI Assistant</span>
          </Link>
        </nav>
      </div>

      {/* Profile Section sesuai image_7ec558.jpg */}
      <div className="mt-auto border-t border-emerald-800/50 pt-6">
        <p className="text-xs font-semibold text-emerald-200/50 uppercase mb-4 px-2">Profile</p>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/50 mb-4">
          <div className="bg-emerald-700 p-2 rounded-lg">
            <User size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Nama User</p>
            <p className="text-[10px] text-emerald-400 truncate">user@example.com</p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-2 w-full px-4 py-3 text-red-300 hover:bg-red-950/30 hover:text-red-100 rounded-xl transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};