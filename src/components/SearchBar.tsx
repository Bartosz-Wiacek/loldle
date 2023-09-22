"use client";
import React, {useEffect, useState} from 'react';
import data from '../../champ-data.json';
import './searchBar.css';
import GuessesTable from "@/components/GuessesTable";

interface Champion {
    name: string;
}

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
    const [guesses, setGuesses] = useState<string>("");
    const [actualChampion, setActualChampion] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        const filteredChamps = data.filter((champ: Champion) =>
            champ.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredChampions(filteredChamps.slice(0, 5));
    };

    const handleChampionClick = (championName: string) => {
        setSearchInput(championName); // Set the search input to the clicked champion name
        setFilteredChampions([]); // Clear the filtered champion list
        setGuesses(championName);
        if (championName === actualChampion) {
            alert("Correct!");
        }
    };

    useEffect(() => {
        setActualChampion(data[Math.floor(Math.random() * data.length)].name);
    }, []);


    return (
        <div className="container">
            <div className="logo">
                <img src="https://loldle.net/img/Logo.f04e5476.webp" alt="Loldle" />
            </div>
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
            {searchInput.length > 0 && (
                <ul className="champion-list">
                    {filteredChampions.map((champ: Champion) => (
                        <li
                            key={champ.name}
                            onClick={() => handleChampionClick(champ.name)} // Add click handler
                        >
                            {champ.name}
                        </li>
                    ))}
                </ul>
            )}
            <GuessesTable guess={guesses} extraProps={{ actualChampion: actualChampion }} />
        </div>
    );
}

export default SearchBar;





