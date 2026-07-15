import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import Container from "@/app/components/Container";

export default async function SingleListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  // Fetch the list AND its items in one query
  const list = await prisma.list.findUnique({
    where: { id },
    include: { items: true },
  });

  // Not found, or not yours
  if (!list || list.ownerId !== session.user.id) {
    notFound();
  }

  // Fetch each movie's details from TMDB
  const token = process.env.TMDB_TOKEN;
  const movies = await Promise.all(
    list.items.map(async (item) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${item.movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const movie = await res.json();
      return { ...movie, watched: item.watched, itemId: item.id };
    }),
  );

  return (
    <Container>
      <h1 className="font-display text-3xl mb-6">{list.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.itemId} className={movie.watched ? "opacity-50" : ""}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg border-2 border-ink" />
            <p className="font-display mt-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
