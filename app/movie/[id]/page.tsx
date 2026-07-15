import Container from "@/app/components/Container";
import { Video } from "@/app/types";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { addMovieToList } from "@/app/lib/actions";
import type { List } from "@/app/generated/prisma/client";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const token = process.env.TMDB_TOKEN;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const movie = await res.json();

  const session = await auth.api.getSession({ headers: await headers() });

  let userLists: List[] = [];
  if (session) {
    userLists = await prisma.list.findMany({
      where: { ownerId: session.user.id },
    });
  }

  const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const videoData = await videoRes.json();

  const trailer = videoData.results.find((video: Video) => video.site === "YouTube" && video.type === "Trailer");

  return (
    <Container>
      <div className="py-24 flex flex-col md:flex-row gap-8">
        {/* LEFT: Poster */}
        <div className="md:w-1/3 shrink-0">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} className="w-full rounded-lg border-2 border-ink" />
        </div>

        {/* RIGHT: Details */}
        <div className="md:w-2/3">
          <h1 className="font-display text-4xl text-ink font-bold">{movie.title}</h1>

          {movie.tagline && <p className="font-body text-brand italic mt-2">{movie.tagline}</p>}

          <div className="flex gap-4 text-muted font-body text-sm mt-4 uppercase tracking-wide">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>{movie.runtime} min</span>
            <span className="text-marigold">★ {movie.vote_average?.toFixed(1)}</span>
          </div>

          <p className="font-body text-ink mt-6 leading-relaxed">{movie.overview}</p>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button className="bg-brand text-background rounded-full px-6 py-2 font-body uppercase text-sm tracking-wider">+ To Watch</button>
            <button className="border-2 border-ink text-ink rounded-full px-6 py-2 font-body uppercase text-sm tracking-wider">✓ Watched</button>
          </div>

          {session && userLists.length > 0 && (
            <form action={addMovieToList} className="flex gap-2 mt-4">
              <input type="hidden" name="movieId" value={movie.id} />
              <select name="listId" className="border-2 border-ink rounded px-3 py-2">
                {userLists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="bg-brand text-background rounded-full px-4 py-2 uppercase">
                Add to List
              </button>
            </form>
          )}

          {trailer && (
            <div className="mt-8">
              <iframe src={`https://www.youtube.com/embed/${trailer.key}`} title="Trailer" allowFullScreen className="w-full aspect-video rounded-lg border-2 border-ink" />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
