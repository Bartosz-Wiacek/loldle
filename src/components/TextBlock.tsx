import React, {useState} from 'react';
import './textBlock.css';

type TextBlockProps = {
    header: string;
    text?: string;
    showButton: boolean;
    width?: string;
    children?: React.ReactNode;
}

export function TextBlock({header, text, showButton, width, children}: TextBlockProps){
    const [show, setShow] = useState(true);

    function isMedia(): boolean {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768;
        }
        return false;
    }

    function setWidth(isMedia: boolean) {
        if (isMedia) {
            return "80%";
        }
        return width?.toString();
    }

    return (
        <>
            {show ? <div className="text-block-container" style={{width: setWidth(isMedia())}}>
                {(showButton && <button onClick={() => setShow(false)} className={"exitButton"}>X</button>)}
                <div className="header-block">
                    <h1>{header}</h1>
                    <h2>{text}</h2>
                    {children}
                </div>
            </div> : null}

        </>

    );
}