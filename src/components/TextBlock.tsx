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

    if (!show) return null;

    return (
            <div style={cssStyle}>
                <div className="text-block-container" >
                    {(showButton && <div onClick={onClick}><button onClick={() => setShow(false)} className={"exitButton"}>X</button></div>)}
                    <div className="header-block">
                        <h1>{header}</h1>
                        <h2>{text}</h2>
                        {children}
                    </div>
                </div>
            </div>
    );
}