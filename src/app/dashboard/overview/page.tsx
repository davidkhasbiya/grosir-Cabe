export default function OverviewPage() {
  const products = [1, 2, 3, 4, 5]; // Data dummy sesuai jumlah di desain

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Selengkapnya <span className="text-gray-400">→</span>
        </h2>
        
        {/* Grid kartu produk sesuai image_7ec521.jpg */}
        <div className="grid grid-cols-5 gap-4">
          {products.map((i) => (
            <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl mb-3 flex items-center justify-center">
                 {/* Ikon placeholder sesuai desain */}
                 <div className="w-8 h-8 bg-gray-300 rounded-full opacity-50" />
              </div>
              <p className="text-sm font-semibold">Produk {i}</p>
              <p className="text-[10px] text-gray-400">Updated today</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Featured <span className="text-gray-400">→</span>
        </h2>
        {/* List item akan kita buat di bawah sini nanti */}
      </div>
    </div>
  );
}