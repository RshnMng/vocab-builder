import React from 'react';
import {Link} from 'react-router-dom';

export default function EmptyDeck(props){
    const createCard = props.props.createCard;
    const creatingCard = props.props.creatingCard;
    const createCardPopup = props.props.createCardPopup;
    const deckType = props.props.deckType;
    const label = props.props.label;
    
    return  <div>
                        <div className='study-deck-topLinks'>
                                <Link className='empty-card-top-link' to='#' onClick={() => createCard()}>add card to deck</Link>
                         </div>
                                {creatingCard && createCardPopup}
                            <div className='no-cards-div'>
                                <h1 className='no-cards-title'>You have no cards saved in your {deckType} deck. Go to {label} to add more words.</h1>
                            </div>
                    </div>
}