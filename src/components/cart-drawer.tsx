"use client";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const router = useRouter();
    const [items, setItems] = useState([
        { id: 1, nama: "Rawit Merah Presto", daerah: "Kediri", harga: 42000, qty: 1000, unit: "Kg" },
        { id: 2, nama: "Cabai Hijau Besar", daerah: "Brebes", harga: 22000, qty: 500, unit: "Kg" },
    ]);

    const removeItem = (id: number) => setItems(prev => prev.filter(item => item.id !== id));
    const updateQty = (id: number, delta: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
    };

    if (!isOpen) return null;

    const subtotal = items.reduce((acc, item) => acc + (item.harga * item.qty), 0);
    const biayaKirim = items.length > 0 ? 400000 : 0;
    const totalEstimasi = subtotal + biayaKirim;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-[110] w-full max-w-md bg-background h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 border-l border-border">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-foreground">Keranjang Belanja</h2>
                    <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="p-5 rounded-[2rem] border border-border bg-card/50 space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                                        <ShoppingBag className="text-primary" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-foreground">{item.nama}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase">{item.daerah}</p>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1 bg-background border border-border rounded-xl p-1 shadow-sm">
                                        <button onClick={() => updateQty(item.id, -50)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-lg text-muted-foreground"><Minus size={14} /></button>
                                        <span className="text-xs font-bold px-2 min-w-[70px] text-center">{item.qty} {item.unit}</span>
                                        <button onClick={() => updateQty(item.id, 50)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-lg text-muted-foreground"><Plus size={14} /></button>
                                    </div>
                                    <p className="font-bold text-sm text-primary">Rp {(item.harga * item.qty).toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground space-y-2">
                            <ShoppingBag size={48} className="opacity-20" />
                            <p className="font-medium">Keranjangmu masih kosong</p>
                        </div>
                    )}
                </div>

                <div className="pt-6 border-t border-border mt-auto space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Estimasi Ongkir</span>
                            <span>Rp {biayaKirim.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t border-border pt-4">
                        <span>Total</span>
                        <span className="text-primary">Rp {totalEstimasi.toLocaleString()}</span>
                    </div>
                    <button
                        type="button"
                        disabled={items.length === 0}
                        className="w-full h-14 bg-foreground text-background rounded-2xl font-bold hover:bg-foreground/90 disabled:bg-muted disabled:cursor-not-allowed transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                            router.push('/dashboard/checkout');
                        }}
                    >
                        Lanjut ke Pembayaran
                    </button>
                </div>
            </div>
        </div>
    );
}