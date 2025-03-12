import React from 'react';

export default function DojoScoreboard(props){
     const dojoStorage = props.props.dojoStorage;
     const round = props.props.round;
    
    return <>
            <div className='scoreboard-div'>
             <div>your bank: <span className='bank-amount'>${dojoStorage.points}</span></div>
                                                  {dojoStorage.numberCorrect <= 3 ? 
                                                  <div>the next correct answer is worth <span className='bank-amount'>${dojoStorage.earlyPurse}</span></div> : 
                                                  dojoStorage.numberCorrect >= 4 && dojoStorage.numberCorrect <= 7 ? 
                                                 <div>the next correct answer is worth <span className='bank-amount'>${dojoStorage.medPurse}</span></div>: 
                                                 dojoStorage.numberCorrect >= 8 && dojoStorage.numberCorrect <= 12 ? 
                                                 <div>the next correct answer is worth <span className='bank-amount'>${dojoStorage.largePurse}</span></div>: 
                                                 dojoStorage.numberCorrect >= 13 && dojoStorage.numberCorrect <= 16 ? 
                                                 <div>the next correct answer is worth $<span className='bank-amount'>{dojoStorage.hugePurse}</span></div> : 
                                                 dojoStorage.numberCorrect >= 17 ? 
                                                 <div>the next correct answer is worth <span className='bank-amount'>${dojoStorage.megaPurse}</span></div>:                       null
                                               }
                                                        <div style={{'color': 'red'}}>strikes: {dojoStorage.incorrect}</div>
                                                        <div style={{'color': 'red'}}>round: {round}</div>
                                                        
                                                        
                                                         <div>
            </div>
    
            </div>
          </>
}