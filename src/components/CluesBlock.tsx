import React, {useMemo, useState} from 'react';
import rawQuotesData from '../../quotes-data.json';
import './cluesBlock.css';
import {TextBlock} from "@/components/TextBlock";

type QuotesData = {
    [key: string]: string[];
};


export function CluesBlock({actualChampionName}: {actualChampionName: string}){
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
            <TextBlock header={randomQuote} showButton={false} />
        </>

    );
}