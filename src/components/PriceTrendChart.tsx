"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const priceData: Record<string, number[]> = {
  "Rawit": [30000, 32000, 31000, 35000, 34000, 38000, 45000],
  "Merah": [25000, 24000, 26000, 28000, 27000, 30000, 32000],
  "Keriting": [28000, 29000, 27000, 31000, 32000, 33000, 35000],
};

const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function PriceTrendChart() {
  const [selectedType, setSelectedType] = useState<string>("Rawit");

  const data = labels.map((hari, i) => ({
    hari,
    harga: priceData[selectedType][i]
  }));

  return (
    <div className="w-full">
      <select
        className="mb-4 text-xs font-bold bg-secondary text-foreground p-2 rounded-lg outline-none cursor-pointer border border-border"
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
      >
        <option value="Rawit">Cabai Rawit</option>
        <option value="Merah">Cabai Merah</option>
        <option value="Keriting">Cabai Keriting</option>
      </select>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHarga" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hari"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#dc2626' }}
            />
            <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
            <Tooltip
              contentStyle={{
                borderRadius: '1rem',
                border: 'none',
                backgroundColor: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)'
              }}
            />
            <Area
              type="monotone"
              dataKey="harga"
              stroke="#dc2626"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorHarga)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}