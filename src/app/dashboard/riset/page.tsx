"use client";
export const dynamic = "force-dynamic"; 
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Bungkus dengan Suspense karena menggunakan useSearchParams
function SearchContent() {
  const katalogStok = [
    { id: 1, nama: "Rawit Merah Presto", daerah: "Kediri, Jatim", harga: 42000, stok: 85, status: "Melimpah" },
    { id: 2, nama: "Cabai Keriting Super", daerah: "Cianjur, Jabar", harga: 31500, stok: 15, status: "Menipis" },
    { id: 3, nama: "Cabai Hijau Besar", daerah: "Brebes, Jateng", harga: 22000, stok: 50, status: "Stabil" },
    { id: 4, nama: "Rawit Hijau Lalapan", daerah: "Malang, Jatim", harga: 28000, stok: 5, status: "Hampir Habis" },
  ];

  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredStok = katalogStok.filter((item) =>
    item.nama.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-serif font-bold text-foreground">
        {query ? <>Hasil untuk <span className="text-red-600 dark:text-red-400">"{query}"</span></> : <>Pantau <span className="text-red-600 dark:text-red-400">Stok Nasional</span></>}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStok.length > 0 ? (
          filteredStok.map((item) => (
            <Link key={item.id} href={`/dashboard/riset/${item.id}`} className="group block">
              <Card className="p-6 rounded-[2.5rem] bg-card border-border shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden">
                <div className="aspect-square bg-muted rounded-[2rem] mb-4 overflow-hidden relative">
                   <img src="/images/red-chili.png" alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <h3 className="font-bold text-foreground">{item.nama}</h3>
                <p className="text-red-600 dark:text-red-400 font-bold mb-4">Rp {item.harga.toLocaleString()}/kg</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className={item.stok < 20 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}>{item.status}</span>
                    <span className="text-foreground">{item.stok}%</span>
                  </div>
                  <Progress value={item.stok} className="h-1.5" />
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-muted-foreground font-medium">Tidak ada stok ditemukan untuk "{query}"</div>
        )}
      </div>
    </div>
  );
}

export default function PantauStokPage() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <SearchContent />
    </Suspense>
  );
}