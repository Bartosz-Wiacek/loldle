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
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        const filteredChamps = data.filter((champ: Champion) =>
            champ.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredChampions(filteredChamps.slice(0, 11));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && filteredChampions.length > 0) { // Check if Enter key is pressed and there are filtered champions
            const firstChampion = filteredChampions[0].name;
            setSearchInput(firstChampion);
            setFilteredChampions([]);
            setGuesses(firstChampion);
            setSearchInput("");
            if (firstChampion === actualChampion) {
                alert("Correct!");
                setIsDisabled(true);
            }
        }
    };

    const handleChampionClick = (championName: string) => {
        setSearchInput(championName); // Set the search input to the clicked champion name
        setFilteredChampions([]); // Clear the filtered champion list
        setGuesses(championName);
        setSearchInput("");
        if (championName === actualChampion) {
            alert("Correct!");
        }
    };

    const handleButtonClick = () => {
        const championName = searchInput.trim().toLowerCase(); // Get the search input and convert to lowercase
        const champion = data.find((champ: Champion) => champ.name.toLowerCase() === championName); // Find the champion with matching name

        if (champion) { // If a matching champion is found
            setGuesses(champion.name);
            setSearchInput("");
            if (champion.name === actualChampion) {
                alert("Correct!");
                setIsDisabled(true);
            }
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

            <div className="submit-container">
                <input
                    type="text"
                    placeholder="Type champion name..."
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={searchInput}
                    className="search-input"
                    disabled={isDisabled}
                />
                <button onClick={handleButtonClick} disabled={isDisabled}>
                    <Image src={"/button-submit.png"} alt={"test"} width={80} height={80}/>
                </button>
            </div>
            <div className="output-searchbar">
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
            </div>

            <GuessesTable guess={guesses} extraProps={{ actualChampion: actualChampion }} />
        </div>
    );
}

export default SearchBar;





