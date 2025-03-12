import React from 'react';


export default function DojoWordDisplay(props){
    let deckInfo = props.props.deckInfo;
    let randomIndex = props.props.randomIndex;
    
    
    return <>
            <div className='dojo-word-div'>   
                                         <div className='dojo-word-header'>{deckInfo[randomIndex].word}</div>
                                            <div className='dojo-word-partofspeech'>{deckInfo[randomIndex].partOfSpeech}</div>
                                            <div className='dojo-word-definition'>{deckInfo[randomIndex].definition}</div>
                                            <div className='dojo-word-example'>Ex: {deckInfo[randomIndex].example}
                                            </div>
            </div>
    
        </>
}