import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import Container from "./components/Container";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Night",
  description: "An app for Sam's friends",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background text-text font-body">
        <header className="border-b border-surface">
          <Container>
            <div className="flex items-center justify-between py-4">
              <a href="/" className="font-display text-2xl text-brand">
                Movie Night
              </a>
              <nav className="flex gap-4 text-muted">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </nav>
            </div>
          </Container>
        </header>

        <main>{children}</main>

        <footer className="border-t border-surface mt-12">
          <Container>
            <p className="py-6 text-muted text-sm">Movie data from TMDB. Built by Sam.</p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
