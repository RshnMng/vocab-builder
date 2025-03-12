import React from 'react';

export default function StudyDeckAddNym(props){
    const nymType = props.props.nymType;
    const updateUserText = props.props.updateUserText;
    const saveUserText = props.props.saveUserText;
    const cancelNymAdd = props.props.cancelNymAdd;
    const userText = props.props.userText;
    
    return <>
            <div className='study-deck-add-nym'>
                            <div>add {nymType}</div>
                            <input className='study-deck-add-nym-input' type='text' onChange={(event) => updateUserText(event)}/>
                            <div className='study-deck-add-nym-btn-div'>
                            {userText.length === 0 || userText === ' ' || userText === '  ' ? <button className='study-deck-add-nym-btn'>add..</button > : <button className='study-deck-add-nym-btn' onClick={saveUserText}>save</button> }
                            <button className='study-deck-add-nym-btn' onClick={cancelNymAdd}>cancel</button>
                            </div>
                    </div>
    
        </>
}