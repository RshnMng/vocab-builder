import React from 'react';

export default function GameOverPopup(props){
    const reqLength = props.props.reqLength;
    const deckInfo = props.props.deckInfo;
    
    return <>
            <div className='gameover-popup-div'>
                <div className='gameover-popup-title'>Game Over!!</div>
                    <div className='gameover-popup'>You are out of money</div>
                    <div className='gameover-popup'>To continue using training dojo, go back to dictionary and save {reqLength === deckInfo.length ? (reqLength + 3) - deckInfo.length : reqLength - deckInfo.length} more definitions to your study deck</div>
    
            </div>
             </>
}