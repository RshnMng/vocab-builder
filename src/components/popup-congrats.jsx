import React from 'react';

export default function CongratsPopup(props){
    const dojoStorage = props.props.dojoStorage;
    const generateNewWord = props.props.generateNewWord;
    
    return <>
            <div className='congrats-div'>
                        <div>Congratulations!!!! You got all the answers right</div> 
                        <div>you now have ${dojoStorage.points} dollars</div>
                        <div className='congrats-btn-div'>
                        <button className='congrats-btn' onClick={generateNewWord}>next word</button>
                        </div>
                                         </div>
    
         </>
}