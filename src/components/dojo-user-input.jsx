import React from 'react';

export default function DojoUserInput(props){
    const generateNewWord = props.props.generateNewWord;
    const userInput = props.props.userInput;
    const updateUserInput = props.props.updateUserInput;
    const showPopup = props.props.showPopup;
    const nextRoundPopup = props.props.nextRoundPopup;
    const gameOver = props.props.gameOver;
    const checkAnswer = props.props.checkAnswer;
    
    return <>
             <div className='dojo-user-input-div'>
               <div className='dojo-user-enter-div'>
                 <input type='text' value={userInput} onChange={(event) => updateUserInput(event)} className='dojo-user-input'/>
                 {userInput === '' || userInput === ' ' || showPopup === true || nextRoundPopup === true || gameOver === true  ? 
                 <button className='dojo-user-enter'>enter</button> : 
                 <button className='dojo-user-enter' onClick={checkAnswer}>enter</button>}
                </div>
                <div className='dojo-user-new-div'>
                 <button  className='dojo-user-new' onClick={() => {generateNewWord()}}>new word</button>
                 </div>
            </div>    
    
          </>
}