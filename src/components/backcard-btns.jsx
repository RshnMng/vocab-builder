import React from 'react';


export default function BackCardBtns(props){
    const index = props.props.index;
    const handleWrongAnswer = props.props.handleWrongAnswer;
    const handleRightAnswer = props.props.handleRightAnswer;
    const deckInfo = props.props.deckInfo;
    
    return <>
            <div className='card-counter'>{index + 1}/{deckInfo.length}</div>
            <div className='deck-navigation-div'>
            <button onClick={handleWrongAnswer} className='deck-nav-btn'>incorrect</button>
            <button onClick={handleRightAnswer} className='deck-nav-btn'>correct</button>
            </div>
    
            </>
}