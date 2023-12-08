import React, {useState} from 'react';
import './textBlock.css';

type TextBlockProps = {
    header: string;
    text?: string;
    showButton: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    cssStyle?: React.CSSProperties;
}

export function TextBlock({header, text, showButton, children, onClick, cssStyle}: TextBlockProps){
    const [show, setShow] = useState(true);

    return (
        <>
            <div style={cssStyle} onClick={onClick}>
                {show ? <div className="text-block-container" >
                    {(showButton && <button onClick={() => setShow(false)} className={"exitButton"}>X</button>)}
                    <div className="header-block">
                        <h1>{header}</h1>
                        <h2>{text}</h2>
                        {children}
                    </div>
                </div> : null}
            </div>
        </>

    );
}