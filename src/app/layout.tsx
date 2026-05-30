import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Student Learning Dashboard",
    template: "%s | Student Learning Dashboard",
  },
  description:
    "A modern student learning dashboard to track courses, progress, and academic goals.",
  keywords: ["learning", "dashboard", "student", "courses", "education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Blocking script to prevent FOUC on initial page load
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-full bg-bg-base text-fg-primary font-sans relative transition-colors duration-500 ease-in-out"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% -20%, var(--theme-glow), transparent),
            var(--bg-base)
          `
        }}
      >
        <ThemeProvider>
        <span
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <section className="relative z-10">
          {children}
        </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
