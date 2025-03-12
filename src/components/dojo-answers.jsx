import React from 'react';

export default function DojoAnswers(props){
    const label = props.props.label;
    const nymDisplay = props.props.nymDisplay;
    
    return <> 
             <div className='dojo-answers-div'>
                         <div className='dojo-answers-label'>{label}</div>
        
                         {nymDisplay}
                        
             </div>
         </>
}