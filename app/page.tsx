import Container from "./components/Container";
import MovieList from "./components/MovieList";
import { Movie } from "./types";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/movies");
  const movies: Movie[] = await res.json();

  return (
    <Container>
      <div className="text-center my-6">
        <p className="text-brand uppercase tracking-[3px] text-sm mb-2">✦ Now Showing ✦</p>
        <h2 className="font-display text-4xl text-ink">Popular This Week</h2>
      </div>
      <MovieList movies={movies} />
    </Container>
  );
}
