import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Memo Games",
  description: "Виробник нетипових настільних ігор",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        <div className="flex flex-col min-h-screen">
        
          <main className="flex-grow">
            {children}
          </main>
         
        </div>
      </body>
    </html>
  );
}
