import SearchBox from "./SearchBox";

export default async function MoviesPage() {

  type Movie = {
    id: number;
    title: string;
    year: number;
    director: string;
  };

  const res = await fetch('http://localhost:3000/api/movies');
  const movies: Movie[] = await res.json();
  
  return (
    <div>
      <h1 className="mb-4">My Movies</h1>
      <SearchBox />
      {movies.map((movie) => (
        <p key={movie.id}>
          {movie.title} ({movie.year}) directed by {movie.director}
        </p>
      ))}
    </div>
  );
}
