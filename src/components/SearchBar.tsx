"use client";
import React, {useEffect, useState} from 'react';
import data from '../../champ-data.json';
import './searchBar.css';
import GuessesTable from "@/components/GuessesTable";
import Image from "next/image";

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
            <div className="text-container">
                <h1>Guess today's League of Legends champion!</h1>
                <h2>Type any champion to begin.</h2>
            </div>

            <input
                type="text"
                placeholder="Type champion name..."
                onChange={handleChange}
                value={searchInput}
                className="search-input"
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
            <button>
                <Image src={"/button-logo.png"} alt={"test"} width={100} height={100}/>
                {/*//FIX THIS AND CHANGE SRC*/}
            </button>
            <GuessesTable guess={guesses} extraProps={{ actualChampion: actualChampion }} />
        </div>
    );
}

export default SearchBar;





