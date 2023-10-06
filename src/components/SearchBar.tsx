"use client";
import React, {useEffect, useState} from 'react';
import data from '../../champ-data.json';
import './searchBar.css';
import GuessesTable from "@/components/GuessesTable";
import Image from "next/image";
import {TextBlock} from "@/components/TextBlock";

interface Champion {
    name: string;
}

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
    const [guesses, setGuesses] = useState<string>("");
    const [actualChampion, setActualChampion] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [dataCopy, setDataCopy] = useState(Array.from(Object.values(data)));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        const filteredChamps = dataCopy.filter((champ: Champion) =>
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
            dataCopy.splice(findIndex(firstChampion), 1);
            setDataCopy(dataCopy);
        }
    };

    const findIndex = (championName: string) => {
        return dataCopy.findIndex((champion: Champion) => champion.name === championName);
    }

    const handleChampionClick = (championName: string) => {
        setSearchInput(championName); // Set the search input to the clicked champion name
        setFilteredChampions([]); // Clear the filtered champion list
        setGuesses(championName);
        setSearchInput("");
        if (championName === actualChampion) {
            alert("Correct!");
            setIsDisabled(true);
        }
        console.log(findIndex(championName))
        dataCopy.splice(findIndex(championName), 1);
        setDataCopy(dataCopy);
        console.log(dataCopy);
    };

    const handleButtonClick = () => {
        const championName = searchInput.trim().toLowerCase(); // Get the search input and convert to lowercase
        const champion = data.find((champ: Champion) => champ.name.toLowerCase() === championName); // Find the champion with matching name

        if (champion) { // If a matching champion is found
            setGuesses(champion.name);
            setSearchInput("");
            dataCopy.splice(findIndex(champion.name), 1);
            setDataCopy(dataCopy);
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
            <TextBlock header="Guess todays League of Legends champion!" showButton={false} text="Type any champion to begin.">
            </TextBlock>

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
                    <div className="champion-list">
                        {filteredChampions.map((champ: Champion) => (
                            <div
                                key={champ.name}
                                onClick={() => handleChampionClick(champ.name)} // Add click handler
                            >
                                <div className="champion-container">
                                    <img className="champion-image" src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champ.name.replace(/[^a-zA-Z0-9]/g, '')}.png`} />
                                {champ.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <GuessesTable guess={guesses} extraProps={{ actualChampion: actualChampion }} />

        </div>
    );
}

export default SearchBar;





