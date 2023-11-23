import React from 'react';
import './cluesBlock.css';
import Image from "next/image";

interface Props {
    numberToClue: number;
    guessesCounter: number;
    imageName: string;
    imageAlt: string;
    title: string;
    handleClick?: () => void;
}
export function CluesElement({numberToClue, guessesCounter, imageName, imageAlt, title, handleClick}: Props){

    const isActive = () => {
        return ((numberToClue - guessesCounter) <= 0);
    }

    return (
        <div className="clues-block-holder">
            {(isActive() ? <><Image src={'./' + imageName + '-active.png'} alt={imageAlt} width={57} height={57} onClick={handleClick}/>
                    <p className={"clues-title"}>{title}</p></>

                : <><Image src={'./' + imageName + '.png'} alt={imageAlt} width={57} height={57}/>
                    <p className={"clues-description"}>{title} in {6 - guessesCounter} tries</p></>  )}
        </div>
    );
}