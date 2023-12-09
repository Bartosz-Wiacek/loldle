"use client";
import React, {useEffect, useRef, useState} from 'react';
import data from '../../champ-data.json';
import './searchBar.css';
import GuessesTable from "@/components/GuessesTable";
import Image from "next/image";
import {TextBlock} from "@/components/TextBlock";
import {CluesBlock} from "@/components/clues/CluesBlock";
import Modal from "@/components/clues/Modal";

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
    const [didWin, setDidWin] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [winningBlock, setWinningBlock] = useState<string>("none");
    const div = useRef<HTMLDivElement>(null);

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
        emoji.style.animationDuration = Math.random() + 1.5 + 's'; // Randomize speed
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
            setWinningBlock("block");
            setIsDisabled(true);
        }, 3250);
        setDidWin(true);
        setTimeout(() => {
            console.log("should go down")
            div.current?.scrollIntoView({ behavior: 'smooth' });
        }, 3500);
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
            handleGuess();
        }
    };

    const handleGuess = () => {
        setDataCopy(dataCopy);
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 3200);
    }

    useEffect(() => {
        if (!isDisabled) {
            const searchInput = document.getElementById("search-input");
            if (searchInput) {
                searchInput.focus();
            }
        }
    }, [isDisabled]);


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
        handleGuess();
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

    const isMobile = () => {
        if (typeof window === 'undefined') return;
        if (window.innerWidth <= 1440)
        {
            return "120%";
        }
        return "200%"
    }

    return (
        <div className="container">
            <div id="emoji-container"></div>
            <div className="logo">
                <img src="https://loldle.net/img/Logo.f04e5476.webp" alt="Loldle" />
            </div>
            <div className="question" >
                <img className={"question-icon"} src={"./question-icon.webp"} alt={"How to play?"} onClick={() => setShowModal(!showModal)} />
                <Modal modal={showModal} toggleModal={() => setShowModal(!showModal)}
                       cssStyle={{width: isMobile(), top: "50%", right: "50%", transform: "translate(50%,-50%)", position: "absolute"}}/>
            </div>
            {!!guesses ? <CluesBlock actualChampionName={actualChampion} header={"Guess todays League of Legends champion!"} guessesCounter={guessesCounter} didWin={didWin} />
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
                    id={"search-input"}
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
                                            : `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champ.name.replace(/[^a-zA-Z0-9]/g, '')}.png` }
                                    />
                                    {champ.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <GuessesTable guess={guesses} extraProps={{ actualChampion: actualChampion }} />
            {didWin ?
                <div style={{display: winningBlock}} ref={div}>
                    <TextBlock header={"gg ez"} showButton={false}>
                        <div style={{flexDirection: "column"}}>
                            <p>You guessed {guesses} in {guessesCounter} guesses!</p>
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${specialChampionNewUrl(guesses).replace(/[^a-zA-Z0-9]/g, '')}_0.jpg`}
                            alt={"splash-art"} width={500} height={350} style={{display: "inline-flex"}}/>
                        </div>
                    </TextBlock>
                </div>: null}
        </div>
    );
}

export default SearchBar;





