import {useEffect, useState} from "react";
import data from '../../champ-data.json';

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

    const [tableData, setTableData] = useState<string[]>([]);
    const [championData, setChampionData] = useState<Champion | null>(null);

    function lookupChampion(championName: string) {
        return data.find((champion: any) => champion.name === championName);
    }

    console.log(lookupChampion(guess));
    console.log(tableData);

    useEffect(() => {
        setTableData([...tableData, guess]);
        setChampionData(lookupChampion(guess) as any);
    }, [guess]);
    return (
        <div>
            You guessed: {guess}
            <br />
            <ul>
                {tableData.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            {championData && (
                <div>
                    <h2>Champion Information</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td>Champion:</td>
                            <td>{championData.name}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{championData.gender}</td>
                        </tr>
                        <tr>
                            <td>Position(s):</td>
                            <td>{championData.position}</td>
                        </tr>
                        <tr>
                            <td>Species:</td>
                            <td>{championData.species}</td>
                        </tr>
                        <tr>
                            <td>Resource:</td>
                            <td>{championData.resource}</td>
                        </tr>
                        <tr>
                            <td>Range type:</td>
                            <td>{championData.range}</td>
                        </tr>
                        <tr>
                            <td>Region(s):</td>
                            <td>{championData.regions}</td>
                        </tr>
                        <tr>
                            <td>Release year:</td>
                            <td>{championData.release_date}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default GuessesTable;