import "./globals.css";
import AiWrapper from "@/components/AiWrapper";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tambahkan suppressHydrationWarning di sini
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <AiWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}