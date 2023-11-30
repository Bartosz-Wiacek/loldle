import React, {useEffect, useMemo, useState} from 'react';
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
    const [scale, setScale] = useState(4.8);

    const transformOriginProps = useMemo(() => {
        const allTransformOriginProps = ["top left", "top center", "top right", "center left", "center center", "center right", "bottom left", "bottom center", "bottom right"];
        return allTransformOriginProps[Math.floor(Math.random() * allTransformOriginProps.length)];
    }, []);

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

    useEffect(() => {
        if (scale > 1) {
            setScale(scale - 0.2);
        }
    }, [guessesCounter]);


    return (
        <>
            <TextBlock header={header} showButton={false}>
                <div className="clues-block">
                    <CluesElement
                        numberToClue={3}
                        guessesCounter={guessesCounter}
                        imageName={'quotes-icon'}
                        imageAlt={'quotes-icon'}
                        title={'Quote Clue'}
                        handleClick={() => {
                            setShowQuote(!showQuote);
                            if(!showQuote) {
                                setShowSplash(false);
                            }
                        }}
                    />
                    <CluesElement
                        numberToClue={6}
                        guessesCounter={guessesCounter}
                        imageName={'splash-icon'}
                        imageAlt={'splash-icon'}
                        title={'Splash Clue'}
                        handleClick={() => {
                            setShowSplash(!showSplash);
                            if(!showSplash) {
                                setShowQuote(false);
                            }
                        }}
                    />
                </div>
                {showQuote ? <p className={"clues-text"}>{'"' + randomQuote + '"'}</p> : null}
                {showSplash ?<div style={{display: "flex", justifyContent: "center", overflowY: "hidden", borderRadius: "5px", marginTop: "5px"}}>
                    <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${specialChampionNewUrl(actualChampionName)}_${randomInteger}.jpg`}
                    alt={"splash-art"} width={500} height={350} style={{transform: `scale(${scale})`, transformOrigin: transformOriginProps}} />
                </div>  : null}
            </TextBlock>
        </>

    );
}