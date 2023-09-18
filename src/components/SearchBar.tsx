"use client";
import React, { useState } from 'react';
import data from '../../champ-data.json';
import './searchBar.css';

interface Champion {
    name: string;
}

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);

        // Filter the champions based on the input value
        const filteredChamps = data.filter((champ: Champion) =>
            champ.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredChampions(filteredChamps.slice(0, 5));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
            {searchInput.length > 0 && (
                <ul className="champion-list">
                    {filteredChampions.map((champ: Champion) => (
                        <li key={champ.name}>{champ.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;





