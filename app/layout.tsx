import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppFooter } from "@/components/AppFooter";
import { InterventionProvider } from "@/context/InterventionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduPulse AI — Academic Early Warning",
  description:
    "AI early-warning and intervention copilot for School ERPs. PRASUNEX Innovathon 2026 prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InterventionProvider>
          {children}
          <AppFooter />
        </InterventionProvider>
      </body>
    </html>
  );
}