import { Movie } from '../types';

export default function MovieCard({ movie }: { movie: Movie }){
    return (
        <article key={movie.id} className="bg-ink rounded-lg overflow-hidden cursor-pointer group">
            {/* Poster area — relative so the rating chip can position over it */}
            <div className="relative overflow-hidden">
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="w-full group-hover:scale-103 transition-transform duration-300"
                />
                {/* Rating chip, pinned to the poster's top-right corner */}
                <span className="absolute top-2 right-2 bg-marigold text-ink text-xs font-bold px-2 py-0.5 rounded-full">
                {movie.vote_average.toFixed(1)}
                </span>
            </div>

            {/* Info section below the poster */}
            <div className="p-3">
                <h3 className="font-display text-text-invert text-base leading-tight">{movie.title}</h3>
                <p className="font-body text-muted-invert text-sm mt-1">
                {movie.release_date?.slice(0, 4)}
                </p>
            </div>
            </article>
    );
}