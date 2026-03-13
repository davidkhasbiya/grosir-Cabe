"use client";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar"; // Sesuaikan path
import { Header } from "@/components/Header";    // Sesuaikan path
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="flex bg-background min-h-screen text-foreground"> {/* Perubahan di sini */}
      <Sidebar isMinimized={isMinimized} setIsMinimized={setIsMinimized} />

      <main className={cn(
        "flex-1 transition-all duration-300 p-8",
        isMinimized ? "ml-20" : "ml-64"
      )}>
        <Header /> {/* Judul akan otomatis terdeteksi via usePathname */}
        {children}
      </main>
    </div>
  );
}