// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // INI KUNCI PEMBATASANNYA
    const systemPrompt = {
      role: "system",
      content: `Anda adalah Asisten AI profesional untuk marketplace cabai bernama "Cabai Jaya". 
      Tugas Anda HANYA membantu mitra pengulak terkait: 
      1. Informasi harga cabai hari ini (cabai rawit, merah keriting, besar, dll).
      2. Status pesanan atau pengiriman.
      3. Tips penyimpanan cabai agar awet.
      4. Stok gudang.
      
      Jika pengguna bertanya di luar topik (seperti politik, resep masakan umum, atau hal lainnya), 
      tolak dengan sopan dan arahkan kembali ke topik perdagangan cabai. 
      Gunakan bahasa yang profesional, ramah, dan ringkas.`
    };

    const chatCompletion = await groq.chat.completions.create({
      // Gabungkan system prompt dengan riwayat pesan pengguna
      messages: [systemPrompt, ...messages],
      model: "llama-3.3-70b-versatile",
    });

    return NextResponse.json({ response: chatCompletion.choices[0]?.message?.content });
  } catch (error) {
    return NextResponse.json({ error: "Gagal terhubung ke AI" }, { status: 500 });
  }
}