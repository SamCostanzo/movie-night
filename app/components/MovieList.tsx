"use client";
import { useState } from "react";
import { Movie } from "../types";
import Search from "./Search";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  
  async function handleSearch() {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data);
  }

  const moviesToShow = results.length > 0 ? results : movies;

  return (
    <div className="py-16">
      <Search query={query} setQuery={setQuery} onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {moviesToShow
          // .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie}/>
          ))}
      </div>
    </div>
  );
}
