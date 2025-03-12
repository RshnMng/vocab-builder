import React from 'react';

export default function WordSearchInput(props){
    const updateUserInput = props.props.updateUserInput;
    const userInput = props.props.userInput;
    const getWord = props.props.getWord;
    
  
    return <>
              <div className='col-6 search-bar-div'>
                            <div className='search-header-div'>
                            <h1 className='search-header'>enter word to search</h1>
                            </div>
                            <div className='search-input-div'>
                            <input type='text' onChange={(event) => updateUserInput(event)} name='user-input' id='user-input' value={userInput} className='search-input' autoComplete='off'/>
                            </div>
                            <div className='search-button-div'>
                            { userInput.length == '' ? <button type='submit' name='submit-btn' id='submit-btn' disabled className='search-button'>enter</button> : <button type='submit' name='submit-btn' id='submit-btn' onClick={(userInput) => getWord(userInput)} className='search-button'>enter</button>}
                            </div>
                </div>
    
    </>
}

