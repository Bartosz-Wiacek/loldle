import './Modal.css';

export default function ModalContent() {


    return (
        <>
            <div style={{ lineHeight: '1.6' }}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>Guess today's champion from Riot's game "League of Legends".</p>

                <h2 style={{ color: '#555' }}>Classic Mode</h2>
                <p>In classic mode, simply type in the name of a champion and it will reveal its properties.</p>
                <ul>
                    <li>The color of the tiles will change to show how close your guess was to the champion to find.</li>
                    <li><span style={{ color: 'green' }}>Green</span> indicates the property is an exact match.</li>
                    <li><span style={{ color: 'orange' }}>Orange</span> indicates partial match.</li>
                    <li><span style={{ color: 'red' }}>Red</span> indicates there is no overlap between your guess and the property.</li>
                    <li>⬇️ ⬆️ With arrows, it also indicates if the answer property is above or below your guess.</li>
                </ul>
            </div>
        </>
    );
}