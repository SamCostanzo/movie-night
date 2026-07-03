import Container from "./Container";


export default function Header(){
    return (
        <header className="bg-ink border-marigold border-b-6">
          <Container>
            <div className="flex items-center justify-between py-4">
              <h1 className="font-display text-2xl text-white">
                Movie Night
              </h1>
              <nav className="flex gap-4 text-text-invert uppercase cursor-pointer">
                <a href="/" className="hover:text-marigold transition-colors duration-300">Browse</a>
                <a href="/Watchlist/" className="hover:text-marigold transition-colors duration-300">Watchlist</a>
                <a href="/watched/" className="hover:text-marigold transition-colors duration-300">Watched</a>
              </nav>
            </div>
          </Container>
        </header>
    );
}