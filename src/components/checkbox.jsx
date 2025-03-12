import React, {useState, useEffect} from 'react';
import { MdOutlineLockOpen } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";


export default function Checkbox(props){
    let word = props.props.word;
    let saved = props.props.saved;
    let saveDefinition = props.props.saveDefinition;
    let removeSaveDefinition = props.props.removeSaveDefinition;
    let getFromLocal = props.props.getFromLocal;
    let index = props.props.index - 1;
     
    const [inDeck, isInDeck] = useState(false);
    
  useEffect(() => {
       let studyDeck = getFromLocal('studyDeck');
       studyDeck.forEach((savedWord) => {
         savedWord.definition === word.definition && isInDeck(true);
       })
  }, [inDeck])
  
  
  let alreadySaved = <div className='already-saved-div' id={word.definition}>
                           <MdOutlineLock id={word.definition} className='closed-lock' onClick={(event) => {
                            removeSaveDefinition(event)
                            isInDeck(false)
                            }}/>
                    <div className='already-saved-text'>saved in study deck</div>
                    </div>
                    
    
    return <>
            
             {inDeck ? alreadySaved : <MdOutlineLockOpen checked={saved} id={word.definition}  className='save-checkbox lock' onClick={(event) => {
                        saveDefinition(index)
                        isInDeck(true)
                        }} /> }
          </>
}


// style the prompt while loading -- make ... animate so user know page is active and loading, add 'thank you for your patience' sentence
// style buttons and nym links 