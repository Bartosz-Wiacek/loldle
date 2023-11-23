import React, { useMemo, useState} from 'react';
import rawQuotesData from '../../../quotes-data.json';
import './cluesBlock.css';
import {TextBlock} from "@/components/TextBlock";
import {CluesElement} from "@/components/clues/clueElement";
import Image from "next/image";
import {specialChampionNewUrl} from "@/components/GuessesTable";

type QuotesData = {
    [key: string]: string[];
};


export function CluesBlock({actualChampionName, header, guessesCounter}: {actualChampionName: string, header: string, guessesCounter: number}){
    const quotesData: QuotesData = rawQuotesData as QuotesData;

    const [showQuote, setShowQuote] = useState(false);
    const [showSplash, setShowSplash] = useState(false);

    const randomQuote = useMemo(() => {
        const quotes = quotesData[actualChampionName];

        if (!quotes || quotes.length === 0) {
            return "No quotes available";
        }

        return quotes[Math.floor(Math.random() * quotes.length)];
    }, [actualChampionName]);

    const randomInteger = useMemo(() => {
        return Math.floor(Math.random() * 3);
    }, []);

    return (
        <>
            <TextBlock header={header} showButton={false}>
                <div className="clues-block">
                    <CluesElement numberToClue={3} guessesCounter={guessesCounter} imageName={'quotes-icon'} imageAlt={'quotes-icon'} title={'Quote Clue'} handleClick={() => setShowQuote(!showQuote)}/>
                    <CluesElement numberToClue={6} guessesCounter={guessesCounter} imageName={'splash-icon'} imageAlt={'splash-icon'} title={'Splash Clue'} handleClick={() => setShowSplash(!showSplash)}/>
                </div>
                {showQuote ? <p className={"clues-text"}>{'"' + randomQuote + '"'}</p> : null}
                {showSplash ?<div style={{display: "flex", justifyContent: "center"}}>
                    <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${specialChampionNewUrl(actualChampionName)}_${randomInteger}.jpg`}
                    alt={"splash-art"} width={500} height={350} />
                </div>  : null}
            </TextBlock>
        </>

    );
}