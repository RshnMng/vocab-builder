import React from 'react';

export default function NextRoundPopup(props){
        const dojoStorage = props.props.dojoStorage;
        const acceptLoss = props.props.acceptLoss;
        const acceptChallenge = props.props.acceptChallenge;
        
        
    return <>
            <div className='nextround-popup-div'>
                 <div className='nextround-popup-title'>You Lost!!</div>
                        <div>...but that doesnt mean you have to lose money, at least not yet.</div>
                         {dojoStorage.round === 1 ? 
                            <div>Would you like to go double or nothing? You get 3 more tries, but this time a loss costs ${Math.floor(dojoStorage.points * .5) }</div> : 
                            dojoStorage.round === 2 ? 
                            <div>Would you like to go ALL IN?? You get 3 more tries, but this time a loss costs your entire pot. A total of ${Math.floor(dojoStorage.points)}</div> : null}
                            
                         <div className='nextround-popup-btn-div'>
                            <button className='nextround-popup-btn' onClick={acceptLoss}>No, Accept the ${dojoStorage.round === 1 ? Math.floor(dojoStorage.points * .25) : dojoStorage.round === 2 ? Math.floor(dojoStorage.points * .5) : dojoStorage.points} loss</button>
                            <button className='nextround-popup-btn' onClick={acceptChallenge}>Yes, Lets go!! </button>
                         </div>
                </div>
         </>
}