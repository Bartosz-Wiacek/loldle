import {CSSProperties, useEffect, useState} from "react";
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


function GuessesTable({ guess, extraProps }: { guess: string; extraProps: ActualChampion }) {

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
            return { ...defaultStyle, color: 'green' }; // MidGuess: Orange
        } else if (actualChampionStats?.includes(championStats[0])) {
            return { ...defaultStyle, color: 'orange' }; // GoodGuess: Green
        } else {
            return { ...defaultStyle, color: 'red' }; // WrongGuess: Red
        }
    }

    function setArrow(year: number) {
        if (year == parseInt(actualChampionData?.release_date as string)) {
            return null;
        }
        else if (year > parseInt(actualChampionData?.release_date as string)) {
            return <AiOutlineArrowDown style={{ background: 'red'}} />
        } else {
            return <AiOutlineArrowUp style={{ background: 'red'}} />
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
        <div>
            <h2>Guessed Champions </h2>
            <table>
                <thead>
                <tr>
                    <th>Champion</th>
                    <th>Gender</th>
                    <th>Position(s)</th>
                    <th>Species</th>
                    <th>Resource</th>
                    <th>Range type</th>
                    <th>Region(s)</th>
                    <th>Release year</th>
                </tr>
                </thead>
                <tbody>
                {guessedChampions.slice().reverse().map((champion, index) => (
                    <tr key={index}>
                        <td className={champion.name === actualChampionData?.name ? 'goodGuess' : 'wrongGuess'}>
                            {champion.name}
                        </td>
                        <td className={champion.gender == actualChampionData?.gender ? 'goodGuess' : 'wrongGuess'}>
                            {champion.gender}
                        </td>
                        <td style={setColor(champion?.position.toString(), actualChampionData?.position.toString())}>
                            {champion?.position}
                        </td>
                        <td style={setColor(champion?.species, actualChampionData?.species.toString())}>
                            {champion?.species}
                        </td>
                        <td style={setColor(champion?.resource, actualChampionData?.resource.toString())}>
                            {champion?.resource}
                        </td>
                        <td style={setColor(champion?.range, actualChampionData?.range.toString())}>
                            {champion?.range}
                        </td>
                        <td style={setColor(champion?.regions, actualChampionData?.regions.toString())}>
                            {champion?.regions}
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