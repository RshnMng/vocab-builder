import React, {useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom';
import OpenAI from 'openai';
import Definitions from '../components/definitions';
import utils from '../Utilities';
import WordSearchInput from '../components/wordsearch-input';
import WordSearchResults from '../components/wordsearch-results';
import WordSearchNotFound from '../components/wordsearch-notfound';



export default function Dictionary(props){
    const createRandomId = utils.utils.createRandomId;
    const saveToLocal = utils.utils.saveToLocal;
    const getFromLocal = utils.utils.getFromLocal;
    
    const userInput = props.props.userInput;
    const setUserInput = props.props.setUserInput;
    const notFound = props.props.notFound;
    const loading = props.props.loading;
    const isLoading = props.props.isLoading;
    const display = props.props.display;
    const setDisplay = props.props.setDisplay;
    const searchedWord = props.props.searchedWord;
    const wordData = props.props.wordData;
    const likeWords = props.props.likeWords;
    const currentWord = props.props.currentWord;
    const setCurrentWord = props.props.setCurrentWord;
    const getWord = props.props.getWord;
    const fromLink = props.props.fromLink;
    const isFromLink = props.props.isFromLink;
   
    const [storage, setStorage] = useState();
    const [notFoundText, setNotFoundText] = useState([]);
    const [notFoundDisplay, setNotFoundDisplay] = useState([]);
  

     function showNotFound(wordData){
            setNotFoundText(wordData.notFound);
    }

     function updateUserInput(event){   
            let input = event.target.value;
            setUserInput(input);
        
        };
        
     function saveDefinition(index){
           let currentSearch = getFromLocal('currentSearch');
    
           let savedDef = currentSearch[index];
           
          savedDef === undefined ? savedDef = currentSearch[userInput][index] : null ;
        //   savedDef.incorrect ? savedDef.incorrect = 0 : null;
            savedDef.incorrect = 0;
           
           let oldStorage = getFromLocal('studyDeck');
           oldStorage.unshift(savedDef);
         
            setStorage(oldStorage);
            saveToLocal('studyDeck', oldStorage);
            
        }
        
        function displayData(dataInfo){  
                let data = dataInfo[userInput];
                saveToLocal('currentSearch', data);  
                setCurrentWord(data);
                let index = 0;
        
         let display = data.map((word) => {
            index++;
            let randomId = createRandomId();
            return <Definitions props={{index, randomId, word, saveDefinition, getFromLocal, createRandomId, storage, setStorage, saveToLocal, removeSaveDefinition, currentWord, userInput, setCurrentWord, getWord, setUserInput, isFromLink, handleLink, fromLink}} key={createRandomId()}/>
           })
           
           setDisplay(display)
        }
        
        
        
            function removeSaveDefinition(event){
               
            let elemTarget = event.target;
            let parentElem = elemTarget.parentElement;
            let wordId = parentElem.id;
          
            let locStore = getFromLocal('studyDeck');
            let newStorage = locStore.filter((word) => {
                return word.definition !== wordId;
            })
            
            setStorage(newStorage)
            saveToLocal('studyDeck', newStorage)  
        }
         
        
         
             function handleLink(event){
            setUserInput(event.target.id);
            isFromLink(true);
        }
         
      
         
         let searchWordHeader = <div className='search-word-header-div'>
                                <h1 className='searched-word-header'>{searchedWord}</h1>
                                <ul className='like-words-list'>{likeWords.map((word) => {
                                    return <li key={createRandomId()} className='like-words-item'>{word}</li>
                                })}</ul>
                                </div>
                                
   
   useEffect(() => {
    if(notFound === false){
     userInput === null || wordData === null ? null : displayData(wordData); 
  
     } else if(notFound === true){
        showNotFound(wordData);
     }
    isLoading(false)
   }, [wordData]);
   
  useEffect(() => {
         let display = <WordSearchNotFound props={{notFoundText, createRandomId, handleLink}}/>
    
    setNotFoundDisplay(display)
    isLoading(false)
  }, [notFoundText])
  
  
  useEffect(() => {
  fromLink === true ? getWord() : null;
  isFromLink(false)
  }, [userInput])
   
    return <>
        <div className='search-container container-fluid'>
            <div className='row search-bar-row'>
                 <WordSearchInput props={{updateUserInput, userInput, getWord}} />
                 <WordSearchResults props={{loading, notFound, notFoundDisplay, searchWordHeader, display}} />
            </div>
         </div>
         
    </>
}






