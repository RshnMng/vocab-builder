import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Checkbox from './checkbox';


export default function Definitions(props){
    
        let [firstLoad, isFirstLoad] = useState(true);
        let word = props.props.word;
        let saveDefinition = props.props.saveDefinition;
        let getFromLocal = props.props.getFromLocal;
        let randomId = props.props.randomId;
        let saveToLocal = props.props.saveToLocal;
        let createRandomId = props.props.createRandomId;
        let [saved, isSaved] = useState(false);
        let removeSaveDefinition = props.props.removeSaveDefinition;
        let [showSyns, setShowSyns] = useState(false);
        let [showAnts, setShowAnts] = useState(false);
        let [addSyn, isAddSyn] = useState(false);
        let [addAnt, isAddAnt] = useState(false);
        let [userSynText, setUserSynText] = useState('');
        let [userAntText, setUserAntText] = useState('');
        let currentWord = props.props.currentWord;
        let setCurrentWord = props.props.setCurrentWord;
        let searchedWord = props.props.userInput;
        let [modifiedWord, setModifiedWord] = useState({});
        let index = props.props.index ;
        let handleLink = props.props.handleLink;
        let [fireAdd, isFireAdd] = useState(false);
            
       
        
       
        function flippedSaved(){
            isSaved((prevState) => {
                return !prevState;
            })
        }
        
        function saveAddedNym(event){
            let definition = event.target.id
            let nymClass = event.target.className;
            let userText;
            let nym;
            
            nymClass === 'syn-added-save-btn' ? nym = 'same' : nym = 'opposite';
            nym === 'same' ? userText = userSynText : userText = userAntText;
            
            
             currentWord[searchedWord].map((def) => {
             def.definition === definition && setModifiedWord(def);
             def.definition === definition && isFireAdd(true);
             def.definition === definition && def[nym].push(userText);       
            });
            
    
            nym === 'same' ? setUserSynText('') : setUserAntText('');
            saveToLocal('currentSearch', currentWord);
        }
        
        function updateAddSyn(event){
            let input = event.target.value;
            setUserSynText(input);
        }
        
         function updateAddAnt(event){
            let input = event.target.value;
            setUserAntText(input);
        }
        
        function addModifiedWord(){ 
            let studyDeck = getFromLocal('studyDeck');
            
          let newDeck = studyDeck.filter((savedWord) => {
               return savedWord.definition !== modifiedWord.definition
          })
          
             newDeck.unshift(modifiedWord);
            saveToLocal('studyDeck', newDeck)
            
        }
        
      
        
        
        useEffect(() => {
         fireAdd === true ? addModifiedWord() : null;
         isFireAdd(false)
         isFirstLoad(false)
        }, [fireAdd])

    return <>
          
            <div key={randomId} className='searched-word-section'>
                  <div className='searched-word-header-div'>
                    <div className='def-spch searched-word-partofspeech'>{word.partOfSpeech}
                    </div>
                    <Checkbox props={{index, word, saved, saveDefinition, removeSaveDefinition, flippedSaved, getFromLocal}}/>
                 </div>
                    <div className='def searched-word-def'>
                    {word.definition}
                    </div>
                    <div className='searched-word-example'>example: {word.example}</div>
                    {showSyns ? <button onClick={() => {
                        setShowSyns(false)
                        isAddSyn(false)
                    }} className='searched-word-syn-button'>Hide Synonyms</button> : <button onClick={() => setShowSyns(true)} className='searched-word-syn-button'>Show Synonyms</button>}
                        <div className='searched-word-syn-div'>
                        {showSyns && word.same.map((syn) => {
                            return <Link key={createRandomId()} key={createRandomId()} className='def-syn' onClick={(event) => handleLink(event)} id={`${syn}`}>{syn}</Link>
                        })}
                        </div>
                        {showSyns && <div>
                                    <button className='search-word-add-syn-button' onClick={() => isAddSyn(true)}>Add Synonym</button>
                        </div>
                        }
                          {addSyn && <div className='modified-alert-div'>
                                <h4 className='modified-alert-syn-header'>All Modified Words will be added to your Study Deck</h4>
                                <input id={word.definition} className='add-nym-input' value={userSynText} onChange={updateAddSyn}/>
                                {userSynText === '' ?  <button id={word.definition} className='syn-added-save-btn'>Save</button> : <button id={word.definition} className='syn-added-save-btn' onClick={saveAddedNym}>Save</button> }
                                <button id={word.definition} className='added-cancel-btn' onClick={() => isAddSyn(false)}>Cancel</button>
                          </div>}
                     {showAnts ? <button onClick={() => {
                        setShowAnts(false);
                        isAddAnt(false);
                    }} className='searched-word-ant-button'>Hide Antonyms</button> : <button onClick={() => setShowAnts(true)} className='searched-word-ant-button'>Show Antonyms</button>}
                        <div className='searched-word-ants-div'>
                        {word.opposite && showAnts ?  word.opposite.map((ant) => {
                            return <Link key={createRandomId()} className='def-ant' onClick={(event) => handleLink(event)} id={`${ant}`}>{ant}</Link>
                        }) : showAnts && word.opposite.map((ant) => {
                            return <Link key={createRandomId()} className='def-ant' onClick={(event) => handleLink(event)} id={`${ant}`}>{ant}</Link>
                        })
                        }
                        </div>
                          {showAnts && <div>
                                    <button className='search-word-add-ant-button' onClick={() => isAddAnt(true)}>Add Antonyms</button>
                        </div>}
                        
                          {addAnt && <div className='modified-alert-div'>
                                <h4 className='modified-alert-syn-header'>All Modified Words will be added to your Study Deck</h4>
                                <input id={word.definition} className='add-nym-input' value={userAntText} onChange={updateAddAnt}/>
                                 {userAntText === '' ?  <button id={word.definition} className='ant-added-save-btn'>Save</button> : <button id={word.definition} className='ant-added-save-btn' onClick={saveAddedNym}>Save</button> }
                                <button id={word.definition} className='added-cancel-btn' onClick={() => isAddAnt(false)}>Cancel</button>
                          </div>}
                </div>
    
          </>
}





