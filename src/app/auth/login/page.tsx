"use client";
export const dynamic = "force-dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Tractor } from "lucide-react";
// 1. Import Firebase
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
    const router = useRouter();

    // 2. Fungsi Login Google
    const handleGoogleLogin = async () => {
        // Tambahkan pengecekan ini
        if (typeof window === "undefined") return;

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();

            document.cookie = `firebase-auth-token=${token}; path=/; max-age=604800; SameSite=Lax;`;
            window.location.href = "/dashboard/overview";
        } catch (error) {
            console.error("Login Gagal:", error);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard/overview");
    };

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
            {/* Tombol Kembali */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-stone-500 hover:text-red-600 transition-colors">
                <ArrowLeft size={20} />
                <span>Kembali ke Katalog</span>
            </Link>

            {/* Container Grid Utama - Ini yang membuat mereka sejajar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-stretch">

                {/* KOLOM KIRI: Portal Pembeli */}
                <Card className="p-8 border-stone-200 shadow-2xl rounded-3xl bg-white flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                                    <ShoppingBag size={32} />
                                </div>
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-stone-950">
                                Portal <span className="text-red-600">Pembeli</span>
                            </h1>
                            <p className="text-stone-500 text-sm">
                                Masuk untuk akses stok eksklusif dan harga grosir harian.
                            </p>
                        </div>

                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full h-12 rounded-xl text-stone-800 flex items-center justify-center gap-3 hover:text-stone-400"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="Google" />
                            Masuk dengan Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-stone-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-stone-400 font-bold">atau dengan email</span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">ID Mitra / Email</label>
                                <Input type="email" placeholder="pengulak@mitra.com" className="rounded-xl border-stone-200 h-12" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Kata Sandi</label>
                                <Input type="password" placeholder="••••••••" className="rounded-xl border-stone-200 h-12" />
                            </div>
                            <div className="text-center py-2">
                                <p className="text-stone-500 text-[11px] italic leading-relaxed">
                                    Versi Beta: Gunakan Google Login untuk akses instan.
                                </p>
                            </div>
                        </form>

                        <div className="text-center pt-4 border-t border-stone-100">
                            <p className="text-sm text-stone-500">
                                Belum terdaftar? <Link href="#" className="text-green-700 font-bold hover:underline">Ajukan Kemitraan</Link>
                            </p>
                        </div>
                    </div>
                </Card>

                {/* KOLOM KANAN: Portal Petani (Coming Soon) */}
                <Card className="p-8 border-stone-200 shadow-2xl rounded-3xl bg-white flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    {/* Badge Coming Soon di pojok */}
                    <div className="absolute top-5 right-5 px-4 py-1 bg-stone-100 text-stone-400 text-[10px] font-bold uppercase rounded-full">
                        Soon
                    </div>

                    <div className="space-y-6">
                        <div className="bg-green-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform">
                            <Tractor size={48} />
                        </div>

                        <div>
                            <h2 className="text-3xl font-serif font-bold text-stone-950">
                                Portal <span className="text-green-600">Petani</span>
                            </h2>
                            <p className="text-stone-500 text-sm mt-3 max-w-[250px] mx-auto">
                                Kelola hasil panen, pantau harga pasar, dan hubungkan langsung ke pembeli.
                            </p>
                        </div>

                        <div className="pt-4 w-full">
                            <Button disabled className="w-full h-14 rounded-2xl bg-stone-100 text-stone-400 cursor-not-allowed font-bold">
                                Coming Soon
                            </Button>
                        </div>

                        <p className="text-[11px] text-stone-400 italic">
                            Fitur manajemen stok dan analitik panen sedang disiapkan.
                        </p>
                    </div>
                </Card>

            </div>
        </div>
    );
}