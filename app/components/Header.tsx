"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }
  const pathname = usePathname();

  return (
    <header className="bg-ink border-marigold border-b-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto py-4 px-4">
        <h1 className="font-display text-2xl text-white">Movie Night</h1>
        <nav className="flex gap-4 text-text-invert uppercase cursor-pointer">
          <Link href="/" className={pathname === "/" ? "text-marigold" : "hover:text-marigold transition-colors duration-300"}>
            Browse
          </Link>
          <Link href="/watchlist" className={pathname === "/watchlist" ? "text-marigold" : "hover:text-marigold transition-colors duration-300"}>
            Watchlist
          </Link>
          <Link href="/watched" className={pathname === "/watched" ? "text-marigold" : "hover:text-marigold transition-colors duration-300"}>
            Watched
          </Link>
          {isPending ? null : session ? (
            <>
              <span className="text-muted-invert">{session.user.name}</span>
              <button onClick={handleSignOut} className="uppercase hover:text-marigold cursor-pointer">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="uppercase hover:text-marigold">
                Log In
              </Link>
              <Link href="/register" className="uppercase hover:text-marigold">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
