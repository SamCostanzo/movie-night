"use client";
import { useState } from "react";
import { Movie } from "../types";
import Search from "./Search";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      {/* <input id="movie-search" value={query} onChange={(e) => setQuery(e.target.value)} /> */}
      <Search query={query} setQuery={setQuery}/>
      <p>Searching for: {query}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies
          .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
          .map((movie) => (
            <article key={movie.id} className="movie-card cursor-pointer">
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} poster`} className="outline-7 outline-[#fff] hover:outline-[#fff] duration-300 ease-in-out" />
            </article>
          ))}
      </div>
    </div>
  );
}
