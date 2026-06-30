import MovieList from "../components/MovieList";
import { Movie } from "../types";

export default async function MoviesPage() {
  const res = await fetch("http://localhost:3000/api/movies");
  const movies: Movie[] = await res.json();

  return (
    <div>
      <h1 className="mb-4">My Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}
