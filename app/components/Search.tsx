

export default function Search({ query, setQuery, onSearch }: { query: string; setQuery: (value: string) => void; onSearch: () => void;  }){
    return (
        <div className="flex items-center gap-2 max-w-md mx-auto mb-8 bg-white border-2 border-ink rounded-full py-2 pl-5 pr-2">
        <span className="text-brand">⌕</span>
        <input
            value={query}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a movie"
            className="flex-1 bg-transparent outline-none text-ink placeholder:text-muted font-body"
        />
        <button onClick={onSearch} className="bg-brand text-background rounded-full px-5 py-2 uppercase text-xs tracking-wider font-body">
            Find
        </button>
        </div>
    );
}


