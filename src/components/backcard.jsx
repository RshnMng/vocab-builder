import React from 'react';
import {Link} from 'react-router-dom';
import DeckHeader from '../components/deckheader';
import BackCardBtns from '../components/backcard-btns';
import StudyDeckNyms from '../components/studydeck-nyms';
import StudyDeckAddNym from '../components/studydeck-addnym';

export default function BackCard(props){
    const deleteCard = props.props.deleteCard;
    const createCard = props.props.createCard;
    const editing = props.props.editing;
    const saveChanges = props.props.saveChanges;
    const handleEditing = props.props.handleEditing;
    const cancelChanges = props.props.cancelChanges;
    const deckInfo = props.props.deckInfo;
    const index = props.props.index;
    const addStruggle = props.props.addStruggle;
    const creatingCard = props.props.creatingCard;
    const createCardPopup = props.props.createCardPopup;
    const add = props.props.add;
    const nymType = props.props.nymType;
    const updateUserText = props.props.updateUserText;
    const saveUserText = props.props.saveUserText;
    const cancelNymAdd = props.props.cancelNymAdd;
    const syns = props.props.syns;
    const ants = props.props.ants;
    const addNym = props.props.addNym;
    const handleWrongAnswer = props.props.handleWrongAnswer;
    const handleRightAnswer = props.props.handleRightAnswer;
    const struggleDuplicate = props.props.struggleDuplicate;
    const strugglePopup = props.props.strugglePopup;
    const alreadyAddedPopup = props.props.alreadyAddedPopup;
    const userText = props.props.userText;
    const type = props.props.type;
    
    
    
    
    
    return <div>
            <DeckHeader props={{deleteCard, createCard}}/>
            {creatingCard && createCardPopup}
               
            <div className='study-card-show-div'>
            <div className='edit-link-div'>
            
            {editing ? <Link to='#' className='save-changes-link' onClick={saveChanges}>save changes</Link> : <Link to='#' onClick={handleEditing}>edit</Link>}
            {editing && <Link to='#' className='cancel-link' onClick={cancelChanges}>cancel</Link>}
            </div>
            <div className='study-deck-show-word'>{deckInfo[index].word}</div> 
            <div className='study-deck-show-def'>{deckInfo[index].definition}</div> 
           
            
            
            {type === 'studyDeck' && addStruggle === true && struggleDuplicate === false ?  strugglePopup : undefined }
            {type === 'studyDeck' && addStruggle === true && struggleDuplicate === true ? alreadyAddedPopup : undefined }
            {creatingCard && createCardPopup}
            
                       
                 
                     <StudyDeckNyms props={{deckInfo, index, syns, ants, addNym}}/>
                   
                 {add && <StudyDeckAddNym props={{nymType, updateUserText, saveUserText, cancelNymAdd, userText}}/>
                         }
            </div>
                
                      <BackCardBtns props={{index, handleRightAnswer, handleWrongAnswer, deckInfo}}/>
            </div>
}