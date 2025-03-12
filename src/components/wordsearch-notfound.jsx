import React from 'react';
import {Link} from 'react-router-dom';

export default function WordSearchNotFound(props){
    const notFoundText = props.props.notFoundText;
    const createRandomId = props.props.createRandomId;
    const handleLink = props.props.handleLink;
    
    return <>
            <div className='not-found-div'>
                <h1 className='not-found-header'>word not found</h1>
                <div className='not-found-question'>did you mean?</div>
                     {notFoundText.map((word) =>{
                     return <Link key={createRandomId()} id={`${word}`}  onClick={(event) => handleLink(event)} className='def-syn'>{word}</Link>
                 })}
    </div>
    
         </>
}