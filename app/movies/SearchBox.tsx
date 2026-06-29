'use client';

import { useState } from "react";

export default function SearchBox(){
    const [query, setQuery] = useState('');

    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <p>Searching for: {query}</p>
        </div>
    );
}