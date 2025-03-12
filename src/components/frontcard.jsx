import React from 'react';
import {Link} from 'react-router-dom';
import DeckHeader from '../components/deckheader';


export default function FrontCard(props){
    const deleteCard = props.props.deleteCard;
    const createCard = props.props.createCard;
    const creatingCard = props.props.creatingCard;
    const createCardPopup = props.props.createCardPopup;
    const deckInfo = props.props.deckInfo;
    const index = props.props.index;
    const duplicate = props.props.duplicate;
    const decreaseIndex = props.props.decreaseIndex;
    const increaseIndex = props.props.increaseIndex;
    const showDefnintion = props.props.showDefnintion;
    
    return <div className='deck-div'>
            <DeckHeader props={{deleteCard, createCard}}/>
            {creatingCard && createCardPopup}
            
            <div className='study-card-div'>
            <div className='study-deck-speech'>{deckInfo[index].partOfSpeech}</div>
            <div style={{'marginTop' : '20px'}} className='study-deck-word'>{deckInfo[index].word}</div> 
            {duplicate && <div>
                                <div>contextual hint</div>
                                <div>{deckInfo[index].same[0]}</div>
                          </div>}
            </div>
             <div className='card-counter'>{index + 1}/{deckInfo.length}</div>
            <div  className='deck-navigation-div'>
            <button className='deck-nav-btn deck-btn-prev' onClick={decreaseIndex}>previous</button>
            <button className='deck-nav-btn deck-btn-next next-btn' onClick={increaseIndex}>next</button>  
            <button className='deck-nav-btn deck-btn-show' onClick={showDefnintion}>show answer</button> 
            </div>
            </div>
}