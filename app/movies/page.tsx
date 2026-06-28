export default async function MoviesPage() {
  const movies = [
    { id: 1, title: "Blade Runner", year: 1982 },
    { id: 2, title: "Dune", year: 2021 },
  ];

  return (
    <div>
      <h1>My Movies</h1>
      {movies.map((movie) => (
        <p key={movie.id}>
          {movie.title} ({movie.year})
        </p>
      ))}
    </div>
  );
}
