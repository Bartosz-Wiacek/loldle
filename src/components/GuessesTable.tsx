import React, {CSSProperties, useEffect, useMemo, useRef, useState} from "react";
import data from '../../champ-data.json';
import './guessTable.css'
import {TextBlock} from "@/components/TextBlock";
import { motion } from "framer-motion"
import Image from "next/image";
import {CluesBlock} from "@/components/CluesBlock";

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
    const actualChampionData = useMemo(() => {
        return lookupChampion(actualChampion);
    }, [actualChampion]);

    const [tableData, setTableData] = useState<string[]>([]);
    const [championData, setChampionData] = useState<Champion | null>(null);
    const [guessedChampions, setGuessedChampions] = useState<Champion[]>([]);
    const isMountedRef = useRef(false);

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

    console.log('actualChampionData')
    console.log(actualChampionData)

    function getIdName(elementId: string) {
        const numericPart = elementId.substring(1); // Remove the first character (the "a" in "a1")
        return parseInt(numericPart, 10);
    }

    function delayCell(cellId : string) {
        const elements = document.getElementsByClassName(cellId) as HTMLCollectionOf<HTMLElement>;
        elements[0].style.opacity = "0";
        setTimeout(() => {
            elements[0].style.opacity = "1";
        }, (getIdName(cellId) * 1000));
    }

    useEffect(() => {
        if (isMountedRef.current) {
            setTableData([...tableData, guess]);
            setChampionData(lookupChampion(guess) as any);
            const champion = lookupChampion(guess);
            if (champion) {
                setGuessedChampions((prevChampions : any) => [...prevChampions, champion]);
            }
            setTimeout(() => {
                delayCell("a1");
                delayCell("a2");
                delayCell("a3");
                delayCell("a4");
                delayCell("a5");
                delayCell("a6");
            }, 1);

        } else {
            isMountedRef.current = true;
        }
    }, [guess]);


    function animateCell() {
        return {
            scale: [1, 1.2, 1],
            transition: { duration: 0.3 }
        };
    }

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

    console.log(guess)

    return (
        <>
            {guess ?
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
                                    <div className={"champ-image"}>
                                        <Image
                                            alt={champion.name}
                                            src={ isSpecialChampionName(champion.name) ? `https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${specialChampionNewUrl(champion.name)}.png`
                                                : `https://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion.name.replace(/[^a-zA-Z0-9]/g, '')}.png` }
                                            width={67} // Set the width as per your CSS
                                            height={67} // Height should be the same as width for a square aspect ratio, adjust if necessary
                                            style={{
                                                objectFit: 'cover',
                                                border: '1.8px solid #9A999A'
                                            }}
                                        />
                                    </div>

                                    <div className={"champion-name"}>{champion.name}</div>
                                </div>
                                <motion.div className={"table-cell a0"} style={setColor(champion?.gender.toString(), actualChampionData?.gender.toString())}
                                            // animate={{ scale: [1, 1.2, 1], transition: { duration: 0.3 } }}
                                >
                                    {champion.gender}
                                </motion.div>
                                <motion.div className={"table-cell a1"} style={setColor(champion?.position.toString(), actualChampionData?.position.toString())}
                                            // animate={{ scale: [1, 1.2, 1], transition: { duration: 0.3 } }}
                                >
                                    {champion?.position.toString().split(/(?=[E-Z])/).join(' ')}
                                </motion.div>
                                {/*Current problems:
                                - animation works only for the first champion*/}
                                <div className={"table-cell a2"} style={setColor(champion?.species, actualChampionData?.species.toString())}>
                                    {champion?.species.toString().split(/(?=[A-Z])/).join(' ')}
                                </div>
                                <div className={"table-cell a3"} style={setColor(champion?.resource, actualChampionData?.resource.toString())}>
                                    {champion?.resource}
                                </div>
                                <div className={"table-cell a4"} style={setColor(champion?.range, actualChampionData?.range.toString())}>
                                    {champion?.range.toString().split(/(?=[A-Z])/).join(' ')}
                                </div>
                                <div className={"table-cell a5"} style={setColor(champion?.regions, actualChampionData?.regions.toString())}>
                                    {champion?.regions.toString().split(/(?=[A-Z])/).join(' ')}
                                </div>
                                <div className={setArrow(champion.release_date) as string + " a6"}>
                                    {champion.release_date}
                                </div>
                            </div>
                        ))}
                    </div>
                    <TextBlock header={"Color indicators"} showButton={true} width={"405px"}>
                        <div className={"box-wrapper"}>
                            <div className={"box-container"}>
                                <div className={"text-block-box"} style={{backgroundColor: "#09C02E"}}></div>
                                <p>Correct</p>
                            </div>
                            <div className={"box-container-partial"}>
                                <div className={"text-block-box"} style={{backgroundColor: "#DE8610"}}></div>
                                <p>Partial</p>
                            </div>
                            <div className={"box-container"}>
                                <div className={"text-block-box"} style={{backgroundColor: "#D4110E"}}></div>
                                <p>Incorrect</p>
                            </div>
                        </div>
                    </TextBlock>
                </div> : null}

        </>
    );
}

export default GuessesTable;