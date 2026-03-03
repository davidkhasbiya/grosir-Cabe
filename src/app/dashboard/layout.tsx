import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Pastikan ada {children} di sini agar konten page.tsx muncul! */}
        {children}
      </main>
    </div>
  );
}