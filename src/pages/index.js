 <div style={styles} className='col-6'>
                                                  <div>your score: {dojoStorage.points}</div>
                                                  {dojoStorage.numberCorrect <= 3 ? 
                                                  <div>the next correct answer is worth {dojoStorage.earlyPurse}</div> : 
                                                  dojoStorage.numberCorrect >= 4 && dojoStorage.numberCorrect <= 7 ? 
                                                 <div>the next correct answer is worth {dojoStorage.medPurse}</div>: 
                                                 dojoStorage.numberCorrect >= 8 && dojoStorage.numberCorrect <= 12 ? 
                                                 <div>the next correct answer is worth {dojoStorage.largePurse}</div>: 
                                                 dojoStorage.numberCorrect >= 13 && dojoStorage.numberCorrect <= 16 ? 
                                                 <div>the next correct answer is worth {dojoStorage.hugePurse}</div> : 
                                                 dojoStorage.numberCorrect >= 17 ? 
                                                 <div>the next correct answer is worth {dojoStorage.megaPurse}</div>:                       null
                                               }
                                                        <div style={{'color': 'red'}}>strikes: {dojoStorage.incorrect}</div>
                                                        <div style={{'color': 'red'}}>round: {round}</div>
                                                 </div>
            
                                 {showPopup && <div style={popupStyle}>
                                                <div>You gotten two incorrect! One more and you lose {dojoStorage.round ===                         1 ? Math.floor(dojoStorage.points * .25) : dojoStorage.round === 2 ? Math.                      floor(dojoStorage.points * .5) : dojoStorage.points}</div>
                                                <button onClick={() => isShowPopup(false)}>ok</button>
                                          </div>}
                                {nextRoundPopup && <div style={popupStyle}>
                                             <div>You Lost!!</div>
                                                <div>...but that doesnt mean you have to lose money, at least not yet.</div>
                                                {dojoStorage.round === 1 ? 
                                                <div>Would you like to go double or nothing? You get 3 more tries, but this                         time a loss costs {Math.floor(dojoStorage.points * .5) }</div> : 
                                                dojoStorage.round === 2 ? 
                                                <div>Would you like to go ALL IN?? You get 3 more tries, but this time a                        loss costs your entire pot. A total of {Math.floor(dojoStorage.points)}</                   div> 
                                                : null}
                                             <button onClick={acceptLoss}>No, Accept the {dojoStorage.round === 1 ? Math.                       floor(dojoStorage.points * .25) : dojoStorage.round === 2 ? Math.floor                  (dojoStorage.points * .5) : dojoStorage.points} loss</button>
                                                <button onClick={acceptChallenge}>Yes, Lets go!! </button>
                                             </div>}
                                 {gameOver && <div style={popupStyle}>
                                                 <div>Game Over!!</div>
                                                 <div>You are out of money</div>
                                                 <div>To continue using training dojo, go back to dictionary and save                       {reqLength === deckInfo.length ? (reqLength + 3) - deckInfo.length :                    reqLength - deckInfo.length} more definitions to your study deck</div>
    
                                             </div>}
                             {congrats && <div style={popupStyle}>
                                                 <div>congratulations you got all the answers right</div> 
                                                 <div>you now have ${dojoStorage.points} dollars</div>
                                                 <button onClick={generateNewWord}>next word</button>
                                         </div>}
                    
                                {add && <div style={popupStyle}>
                                          <div>congratulations!! you now have ${dojoStorage.points} dollars</div>
                                             <div>you have answered all the given {label} for {deckInfo[randomIndex].                       word} ... so far... </div> 
                                             <div>Would you like to try {deckInfo[randomIndex][selection].length -                      dojoStorage.numberCorrect >= 6 ? 6 : deckInfo[randomIndex][selection].length -                      dojoStorage.numberCorrect} more</div>
                     
                                            <button onClick={handleShownAmount}>Yes, more {label}</button>       
                                            <button onClick={generateNewWord}>No, next word</button>
        
                </div>}