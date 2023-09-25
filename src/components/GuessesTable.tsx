"use client"; // delete after resolving issue with not being in the center
import React, {CSSProperties, useEffect, useState} from "react";
import data from '../../champ-data.json';
import './guessTable.css'
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

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
            return { ...defaultStyle, backgroundColor: 'green' }; // MidGuess: Orange
        } else if (actualChampionStats?.includes(championStats[0])) {
            return { ...defaultStyle, backgroundColor: 'orange' }; // GoodGuess: Green
        } else {
            return { ...defaultStyle, backgroundColor: 'red' }; // WrongGuess: Red
        }
    }

    function setArrow(year: number) {
        if (year == parseInt(actualChampionData?.release_date as string)) {
            return null;
        }
        else if (year > parseInt(actualChampionData?.release_date as string)) {
            return <AiOutlineArrowDown />
        } else {
            return <AiOutlineArrowUp />
        }
    }

    function comparePositions(championPosition: any) { // TODO: Fix this function
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
    console.log('championData')
    console.log(championData)

    useEffect(() => {
        setTableData([...tableData, guess]);
        setChampionData(lookupChampion(guess) as any);
        const champion = lookupChampion(guess);
        if (champion) {
            setGuessedChampions((prevChampions : any) => [...prevChampions, champion]);
        }
    }, [guess]);

    return (
        <div className="table">
            <table>
                    <thead>
                    <tr>
                        <th>Champion <div className="line"> </div></th>
                        <th>Gender <div className="line"> </div></th>
                        <th>Position(s) <div className="line"> </div></th>
                        <th>Species <div className="line"> </div></th>
                        <th>Resource <div className="line"> </div></th>
                        <th>Range type <div className="line"> </div></th>
                        <th>Region(s) <div className="line"> </div></th>
                        <th>Release year <div className="line"> </div></th>
                    </tr>
                    </thead>

                <tbody className="guessed-champions">
                {guessedChampions.slice().reverse().map((champion, index) => (
                    <tr key={index} >
                        <td style={{ position: "relative" }}>
                            <img className="champion-image" src={`https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion.name.replace(/\s+/g, '')}.png`} />
                            <div className="champion-name">{champion.name}</div>
                        </td>
                        <td className={champion.gender == actualChampionData?.gender ? 'goodGuess' : 'wrongGuess'}>
                            {champion.gender}
                        </td>
                        <td style={setColor(champion?.position.toString(), actualChampionData?.position.toString())}>
                            {champion?.position.toString().split(/(?=[A-Z])/).join(' ')}
                        </td>
                        <td style={setColor(champion?.species, actualChampionData?.species.toString())}>
                            {champion?.species.toString().split(/(?=[A-Z])/).join(' ')}
                        </td>
                        <td style={setColor(champion?.resource, actualChampionData?.resource.toString())}>
                            {champion?.resource}
                        </td>
                        <td style={setColor(champion?.range, actualChampionData?.range.toString())}>
                            {champion?.range.toString().split(/(?=[A-Z])/).join(' ')}
                        </td>
                        <td style={setColor(champion?.regions, actualChampionData?.regions.toString())}>
                            {champion?.regions.toString().split(/(?=[A-Z])/).join(' ')}
                        </td>
                        <td className={champion.release_date == parseInt(actualChampionData?.release_date as string)  ? 'goodGuess' : 'wrongGuess'}>
                            {champion.release_date}
                            {setArrow(champion.release_date)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default GuessesTable;