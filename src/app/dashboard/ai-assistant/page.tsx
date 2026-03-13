"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Clock, Package, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Halo Mitra Pengulak! 👋 Ada yang bisa saya bantu cek mengenai stok atau status pesanan cabai Anda hari ini?" }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text })) }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages([...newMessages, { role: "ai", text: data.response }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: "ai", text: "Maaf, sistem sedang sibuk." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: "Status Pesanan", icon: <Package size={14} /> },
    { label: "Harga Hari Ini", icon: <Clock size={14} /> },
    { label: "Bantuan Admin", icon: <HelpCircle size={14} /> }
  ];

  return (
    <div className="h-[85vh] flex flex-col max-w-2xl mx-auto w-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-border mb-4">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="font-bold text-foreground">Asisten AI Grosir</h1>
          <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Online
          </p>
        </div>
      </div>

      {/* Main Chat Card */}
      <Card className="flex-1 p-4 border border-border shadow-xl rounded-[2rem] flex flex-col overflow-hidden bg-card">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-1">
                  <Bot size={16} />
                </div>
              )}
              <div className={cn(
                "max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === "ai" 
                  ? "bg-muted text-foreground rounded-bl-none" 
                  : "bg-primary text-primary-foreground rounded-br-none"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" className="rounded-full h-9 text-xs gap-2 shrink-0">
              {action.icon} {action.label}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2 p-2 bg-background rounded-full border border-border shadow-sm">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ketik pesan Anda..."
            className="bg-transparent border-none focus-visible:ring-0 px-4 text-foreground"
          />
          <Button onClick={sendMessage} disabled={isLoading} className="rounded-full w-12 h-12 p-0">
            {isLoading ? "..." : <Send size={18} />}
          </Button>
        </div>
      </Card>
    </div>
  );
}