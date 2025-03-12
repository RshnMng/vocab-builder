import React from 'react';

export default function WarningPopup(props){
    const dojoStorage = props.props.dojoStorage;
    const isShowPopup = props.props.isShowPopup;
    
    return <> 
                
                <div className='warning-popup-div'>
                     <div> You gotten two incorrect! One more and you lose ${
                            dojoStorage.round ===  1 ? Math.floor(dojoStorage.points * .25) : 
                            dojoStorage.round === 2 ? Math.floor(dojoStorage.points * .5) : 
                            dojoStorage.points}
                     </div>
                     <div className='warning-popup-btn-div'>
                     <button className='warning-popup-btn' onClick={() => isShowPopup(false)}>ok</button>
                     </div>
                </div>
            </>
}