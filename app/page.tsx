import Container from "./components/Container";
import MovieList from "./components/MovieList";
import { Movie } from "./types";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/movies");
  const movies: Movie[] = await res.json();

  return (
    <Container>
      <MovieList movies={movies} />
    </Container>
  );
}
