'use client';

import Container from "./Container";
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function Header(){

    const pathname = usePathname();
    
    return (
        <header className="bg-ink border-marigold border-b-6">
          <Container>
            <div className="flex items-center justify-between py-4">
              <h1 className="font-display text-2xl text-white">
                Movie Night
              </h1>
              <nav className="flex gap-4 text-text-invert uppercase cursor-pointer">
                <Link href="/" className={pathname === "/" ? "text-marigold" : "hover:text-marigold transition-colors duration-300"}>Browse</Link>
                <Link href="/watchlist" className={pathname === "/watchlist" ? "text-marigold" : "hover:text-marigold transition-colors duration-300"}>Watchlist</Link>
                <Link href="/watched" className={pathname === "/watched" ? "text-marigold" : "hover:text-marigold transition-colors duration-300"}>Watched</Link>

              </nav>
            </div>
          </Container>
        </header>
    );
}