"use client";
import { useState } from "react";
import { Movie } from "../types";
import Search from "./Search";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  }

  const moviesToShow = hasSearched ? results : movies;

  return (
    <div className="py-16">
      <Search query={query} setQuery={setQuery} onSearch={handleSearch} onClear={clearSearch} />

      {loading ? (
        <p className="text-center text-muted font-body">Searching...</p>
      ) : hasSearched && moviesToShow.length === 0 ? (
        <p className="text-center text-muted font-body">No movies found. Try another title.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {moviesToShow.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
