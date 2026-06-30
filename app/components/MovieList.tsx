"use client";
import { useState } from "react";
import { Movie } from "../types";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input id="movie-search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>Searching for: {query}</p>
      <div className="grid grid-cols-5 gap-4">
        {movies
          .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
          .map((movie) => (
            <article key={movie.id} className="movie-card p-4 bg-[#333]">
              {/* <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p> */}
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
            </article>
          ))}
      </div>
    </div>
  );
}
