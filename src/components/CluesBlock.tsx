import React, {useMemo, useState} from 'react';
import rawQuotesData from '../../quotes-data.json';
import './cluesBlock.css';
import {TextBlock} from "@/components/TextBlock";
import Image from "next/image";

type QuotesData = {
    [key: string]: string[];
};


export function CluesBlock({actualChampionName, header, guessesCounter}: {actualChampionName: string, header: string, guessesCounter: number}){
    const quotesData: QuotesData = rawQuotesData as QuotesData;

    const randomQuote = useMemo(() => {
        const quotes = quotesData[actualChampionName];

        if (!quotes || quotes.length === 0) {
            return "No quotes available";
        }

        return quotes[Math.floor(Math.random() * quotes.length)];
    }, [actualChampionName]);


    return (
        <>
            <TextBlock header={header} showButton={false}>
                <div className="clues-block">
                    <div className="clues-block-holder">
                        <Image src={'./quotes-icon.png'} alt={'quotes-icon'} width={57} height={57}/>
                        <p className={"clues-description"}>Quote Clue in {6 - guessesCounter} tries</p>
                    </div>
                    <div className="clues-block-holder">
                        <Image src={'./splash-icon.png'} alt={'splash-icon'} width={57} height={57}/>
                        <p className={"clues-description"}>Splash Clue in {12 - guessesCounter} tries</p>
                    </div>
                </div>
            </TextBlock>
        </>

    );
}