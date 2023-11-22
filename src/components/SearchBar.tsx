"use client";
import React, {useEffect, useState} from 'react';
import data from '../../champ-data.json';
import './searchBar.css';
import GuessesTable from "@/components/GuessesTable";
import Image from "next/image";
import {TextBlock} from "@/components/TextBlock";
import {CluesBlock} from "@/components/clues/CluesBlock";

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
    const [guessesCounter, setGuessesCounter] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        const filteredChamps = dataCopy.filter((champ: Champion) =>
            champ.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredChampions(filteredChamps.slice(0, 11));
    };

    function createEmoji() {
        const emojiArray = ['😀', '🏆', '🎉', '🌟', '🙏']; // Add more emojis as needed
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = Math.random() * 3 + 3 + 's'; // Randomize speed
        document.getElementById('emoji-container')?.appendChild(emoji);

        emoji.addEventListener('animationend', () => {
            emoji.parentNode?.removeChild(emoji);
        });
    }

    const handleWonGame = () => {
        setTimeout(() => {
            for (let i = 0; i < 70; i++) {
                createEmoji();
            }
            setIsDisabled(true);
        }, 6500);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && filteredChampions.length > 0) { // Check if Enter key is pressed and there are filtered champions
            const firstChampion = filteredChampions[0].name;
            setSearchInput(firstChampion);
            setFilteredChampions([]);
            setGuesses(firstChampion);
            setGuessesCounter((prev) => prev + 1);
            setSearchInput("");
            if (firstChampion === actualChampion) {
                handleWonGame();
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
        setGuessesCounter((prev) => prev + 1);
        setSearchInput("");
        if (championName === actualChampion) {
            handleWonGame();
        }
        dataCopy.splice(findIndex(championName), 1);
        setDataCopy(dataCopy);
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

    const isSpecialChampionName = (championName: string) => {
        if (championName == "LeBlanc" || championName == "Wukong" || championName == "Cho'Gath" || championName == "Kai'Sa" || championName == "Kha'Zix" || championName == "Vel'Koz" || championName == "Nunu & Willump") {
            return true;
        }
    }

    const specialChampionNewUrl = (championName: string) => {
        switch (championName) {
            case "Wukong":
                return "MonkeyKing";
            case "Cho'Gath":
                return "Chogath";
            case "Kai'Sa":
                return "Kaisa";
            case "Kha'Zix":
                return "Khazix";
            case "Vel'Koz":
                return "Velkoz";
            case "Nunu & Willump":
                return "Nunu";
            case "LeBlanc":
                    return "Leblanc";
            default:
                return championName;
        }
    }

    useEffect(() => {
        setActualChampion(data[Math.floor(Math.random() * data.length)].name);
    }, []);

    return (
        <div className="container">
            <div id="emoji-container"></div>
            <div className="logo">
                <img src="https://loldle.net/img/Logo.f04e5476.webp" alt="Loldle" />
            </div>
            {!!guesses ? <CluesBlock actualChampionName={actualChampion} header={"Guess todays League of Legends champion!"} guessesCounter={guessesCounter} />
                : <TextBlock header="Guess todays League of Legends champion!" showButton={false} text="Type any champion to begin." />}

            <div className="submit-container">
                <input
                    type="text"
                    placeholder="Type champion name..."
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={searchInput}
                    className="search-input"
                    disabled={isDisabled}
                    autoFocus={true}
                />
                <button onClick={handleButtonClick} disabled={isDisabled}>
                    <Image src={"./button-submit.png"} alt={"SUBMIT"} width={80} height={80}/>
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
                                    <Image
                                        alt={champ.name}
                                        width={38}
                                        height={38}
                                        style={{margin: "10px"}}
                                        src={ isSpecialChampionName(champ.name) ? `https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${specialChampionNewUrl(champ.name)}.png`
                                            : `https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champ.name.replace(/[^a-zA-Z0-9]/g, '')}.png` }
                                    />
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





