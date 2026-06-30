export async function GET() {
  const token = process.env.TMDB_TOKEN;

  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return Response.json(data.results);
}
