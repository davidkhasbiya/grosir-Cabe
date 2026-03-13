"use client";
import { Bell, Search, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
    const router = useRouter();
    const user = auth.currentUser;
    const pathname = usePathname();

    // Mapping URL ke Nama Halaman
    const getPageTitle = (path: string) => {
        if (path.includes("/overview")) return "Overview Dashboard";
        if (path.includes("/riset")) return "Pantau Stok & Riset";
        if (path.includes("/ai-assistant")) return "Asisten AI";
        if (path.includes("/laporan")) return "Laporan Harga";
        if (path.includes("/transaksi")) return "Riwayat Pesanan";
        if (path.includes("/profile")) return "Profil Mitra";
        if (path.includes("/settings")) return "Pengaturan";
        if (path.includes("/checkout")) return "Pembayaran";
        return "Dashboard";
    };

    const Title = getPageTitle(pathname);
    const [query, setQuery] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            router.push(`/dashboard/riset?q=${query}`);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        document.cookie = "firebase-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/auth/login");
    };

    return (
        <header className="flex items-center justify-between pb-8">
            <h1 className="text-2xl font-bold text-foreground">{Title}</h1>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Cari transaksi atau harga..."
                        className="pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none w-64 text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                <button className="p-2 bg-background rounded-full border border-border text-foreground hover:text-primary transition-colors">
                    <Bell size={20} />
                </button>

                {/* Profil dengan Dropdown Logout */}
                <div className="relative group">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold border border-border cursor-pointer">
                        {user?.displayName ? user.displayName.charAt(0) : "U"}
                    </div>
                    {/* Logout Dropdown - Gunakan bg-card dan text-foreground */}
                    <button
                        onClick={handleLogout}
                        className="absolute right-0 mt-2 w-32 bg-card shadow-xl rounded-xl border border-border p-2 text-sm text-foreground hidden group-hover:flex items-center gap-2 hover:text-red-600 transition-colors"
                    >
                        <LogOut size={16} /> Keluar
                    </button>
                </div>
            </div>
        </header>
    );
}