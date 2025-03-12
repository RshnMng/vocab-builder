import React from 'react';
import {Link} from 'react-router-dom';

export default function DeckHeader(props){
    const deleteCard = props.props.deleteCard;
    const createCard = props.props.createCard;
    
    
  
    return <>
              <div className='study-deck-topLinks'>
                 <div className='top-links-div'>
                    <Link className='study-card-topLink' to='#' onClick={() => deleteCard()}>delete card</Link>
                    <Link className='study-card-topLink' to='#' onClick={() => createCard()}>add card to deck</Link>
                 </div>
             </div>
            </>
}