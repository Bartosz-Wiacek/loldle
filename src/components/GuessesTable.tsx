"use client"; // delete after resolving issue with not being in the center
import React, {CSSProperties, useEffect, useState} from "react";
import data from '../../champ-data.json';
import './guessTable.css'

interface ActualChampion {
    actualChampion: string;
}

interface Champion {
    name: string;
    gender: string;
    position: string;
    species: string;
    resource: string;
    range: string;
    regions: string;
    release_date: number;
}


function GuessesTable({ guess, extraProps }: { guess: string; extraProps: ActualChampion}) {

    const { actualChampion } = extraProps;
    const actualChampionData = lookupChampion(actualChampion)

    const [tableData, setTableData] = useState<string[]>([]);
    const [championData, setChampionData] = useState<Champion | null>(null);
    const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);

    function lookupChampion(championName: string) {
        return data.find((champion: any) => champion.name === championName);
    }

    function setColor(championStats: any, actualChampionStats: any): CSSProperties {
        const defaultStyle: CSSProperties = { color: 'white' };
        if (championStats.toString() == actualChampionStats?.toString()) {
            return { ...defaultStyle, backgroundColor: '#0BC22F' }; // MidGuess: Orange
        } else if (actualChampionStats?.includes(championStats[0])) {
            return { ...defaultStyle, backgroundColor: '#DD830D' }; // GoodGuess: Green
        } else {
            return { ...defaultStyle, backgroundColor: '#DA150F' }; // WrongGuess: Red
        }
    }

    function setArrow(year: number) {
        if (year == parseInt(actualChampionData?.release_date as string)) {
            return "goodGuess";
        }
        else if (year > parseInt(actualChampionData?.release_date as string)) {
            return "wrongGuessDown";
        } else {
            return "wrongGuessUp";
        }
    }

    function comparePositions(championPosition: any) { // TODO: Fix this function or maybe it will fix itself when we get new json data
        const defaultStyle: CSSProperties = { color: 'white' };
        if ((championPosition[0] == (actualChampionData?.position[0]) || actualChampionData?.position[1]) &&
        (championPosition[1] == (actualChampionData?.position[0]) || actualChampionData?.position[1])) {
            return { ...defaultStyle, color: 'green' };
        }
        else
        {
            setColor(championPosition.toString(), actualChampionData?.position.toString())
        }
    }

    console.log('actualChampionData')
    console.log(actualChampionData)

    useEffect(() => {
        setTableData([...tableData, guess]);
        setChampionData(lookupChampion(guess) as any);
        const champion = lookupChampion(guess);
        if (champion) {
            setGuessedChampions((prevChampions : any) => [...prevChampions, champion]);
        }
    }, [guess]);

    return (
        <div>
            <div className="table2">
                {/*Header*/}
                <div className="table2-head-wraper">
                <div className="table2-header">
                    Champion
                </div>
                <div className="table2-header">
                    Gender
                </div>
                <div className="table2-header">
                    Position(s)
                </div>
                <div className="table2-header">
                    Species
                </div>
                <div className="table2-header">
                    Resource
                </div>
                <div className="table2-header">
                    Range type
                </div>
                <div className="table2-header">
                    Region(s)
                </div>
                <div className="table2-header">
                    Release year
                </div>
                    </div>
                {/*Output*/}
                {guessedChampions.slice().reverse().map((champion, index) => (
                <div key={index} className="table2-output">
                    <div className="table2-output-champion">
                        <img className="champ-image" src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion.name.replace(/[^a-zA-Z0-9]/g, '')}.png`} />
                        <div className={"champion-name"}>{champion.name}</div>
                    </div>
                    <div className={"table-cell"} style={setColor(champion?.gender.toString(), actualChampionData?.gender.toString())}>
                        {champion.gender}
                    </div>
                    <div className={"table-cell"} style={setColor(champion?.position.toString(), actualChampionData?.position.toString())}>
                        {champion?.position.toString().split(/(?=[A-Z])/).join(' ')}
                    </div>
                    <div className={"table-cell"} style={setColor(champion?.species, actualChampionData?.species.toString())}>
                        {champion?.species.toString().split(/(?=[A-Z])/).join(' ')}
                    </div>
                    <div className={"table-cell"} style={setColor(champion?.resource, actualChampionData?.resource.toString())}>
                        {champion?.resource}
                    </div>
                    <div className={"table-cell"} style={setColor(champion?.range, actualChampionData?.range.toString())}>
                        {champion?.range.toString().split(/(?=[A-Z])/).join(' ')}
                    </div>
                    <div className={"table-cell"} style={setColor(champion?.regions, actualChampionData?.regions.toString())}>
                        {champion?.regions.toString().split(/(?=[A-Z])/).join(' ')}
                    </div>
                    <div className={setArrow(champion.release_date) as string}>
                        {champion.release_date}
                    </div>
                </div>
                ))}
            </div>
            </div>


    );
}

export default GuessesTable;