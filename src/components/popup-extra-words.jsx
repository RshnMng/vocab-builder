import React from 'react';

export default function ExtraWordsPopup(props){
    const dojoStorage = props.props.dojoStorage;
    const label = props.props.label;
    const deckInfo = props.props.deckInfo;
    const randomIndex = props.props.randomIndex;
    const selection = props.props.selection;
    const handleShownAmount = props.props.handleShownAmount;
    const generateNewWord = props.props.generateNewWord;
    
    return <> 
            <div className='add-words-div'>
                <div className='add-words-div-title'>Congratulations!! you now have ${dojoStorage.points} dollars</div>
                <div className='add-words-div-title'>you have answered all the given {label} for {deckInfo[randomIndex].word} ... so far... </div> 
                <div className='add-words-div-title'>Would you like to try {deckInfo[randomIndex][selection].length - dojoStorage.numberCorrect >= 6 ? 6 : 
                deckInfo[randomIndex][selection].length - dojoStorage.numberCorrect} more</div>
                
                <div className='add-words-btn-div'>
                <button className='add-words-btn' onClick={handleShownAmount}>Yes, more {label}</button>       
                <button className='add-words-btn' onClick={generateNewWord}>No, next word</button>
                </div>
        
            </div>
         </>
}