export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-[#1B4D3E]">Selamat Datang di Kasir.id</h1>
      <a href="/dashboard/overview" className="mt-4 px-6 py-2 bg-[#1B4D3E] text-white rounded-lg">
        Buka Dashboard
      </a>
    </div>
  );
}