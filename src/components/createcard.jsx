import React, {useState, useEffect} from 'react';

export default function CreateCard(props){
    const isCreatingCard = props.props.isCreatingCard;
    const saveToLocal = props.props.saveToLocal;
    const getFromLocal = props.props.getFromLocal;
    const setDeckInfo = props.props.setDeckInfo;
    const wordSaved = props.props.wordSaved;
    const isWordSaved = props.props.isWordSaved;
    
   
    
    
    const [userWord, setUserWord] = useState({
        word: '',
        definition: '',
        partOfSpeech: '',
        same: [],
        opposite: [],
        relatedWords: [],
        incorrect: 0,
    });
    
    const [filledOutError, isFilledOutError] = useState(false);
    
    function updateUserInput(event){
    const inputText = event.target.value;
    const id = event.target.id;
    
    setUserWord((prevState) => {
        return {...prevState, [id]: inputText}
    })
    }
    
    function saveArrays(className){
       let elements = document.getElementsByClassName(className);
       let elems = Array.from(elements);
       let array = [];
       
       elems.map((item) => {
        item.value === '' || item.value === ' ' ? null : array.push(item.value) ;
       });
       
       className === 'label-input syn' ? setUserWord((prevState) => {
        return {...prevState, same: array}
       }) : className === 'label-input ant' ? setUserWord((prevState) => {
        return {...prevState, opposite: array}
       }) : setUserWord((prevState) => {
        return {...prevState, relatedWords: array}
       })
    };
    
    function checkIfFilledOut(){
        userWord.word === '' || userWord.word === ' ' || userWord.definition === '' || userWord.definition === ' ' ? isFilledOutError(true) : updateObjectArrays();
    }
    
    function updateObjectArrays(){
        saveArrays('label-input syn');
        saveArrays('label-input ant');
        saveArrays('label-input root');
        isWordSaved(true);
        
    };
    
    function saveWordToDeck(){
        let studyDeck = getFromLocal('studyDeck');
        studyDeck.unshift(userWord);
        saveToLocal('studyDeck', studyDeck);
        setDeckInfo(studyDeck);
       wordSaved === true && isCreatingCard(false);
      
    }
   
    
 useEffect(() => {
    wordSaved === true && saveWordToDeck();
   
 }, [wordSaved]) 
  

    return <>
            <div className='create-card-popup'>
                                <h1>Add Your Card</h1>
                                <h4>(card will be added to study deck)</h4>
                                {filledOutError && <div className='add-card-warning'>Please make sure you provide both a word/phrase and a definition</div>}
                                <div className='create-card-container container'>
                                
                               <div className='create-card-row row'>
                                        <div className='create-card-word-pos-div col-6'> 
                                        <div> word/phrase : </div>
                                            <input type='text' className='label-input-word input' id='word' onChange={(event) => updateUserInput(event)} required autoComplete="off"/>
                                        <div>part of speech: </div>
                                            <input type='text' className='label-input-pos input' id='partOfSpeech' onChange={(event) => updateUserInput(event)} autoComplete="off"/>
                                        </div>
                                     <div className='create-card-def-div col-6'> 
                                            <div>defintion: </div>
                                            <textarea type='text-area' className='label-input-definition input' id='definition' onChange={(event) => updateUserInput(event)} required></textarea>
                                    </div>
                                    </div>
                                <div className='create-card-nyms-div'>
                                        <div className='row gx-5'>
                                            <div className='create-card-nym-section col-4'> synonyms:
                                                <input type='text' className='label-input syn input' autoComplete="off"/>
                                                <input type='text' className='label-input syn input' autoComplete="off"/>
                                                <input type='text' className='label-input syn input' autoComplete="off"/>
                                            </div>
                                             <div className='create-card-nym-section col-4'> antonyms:
                                                <input type='text' className='label-input ant input' autoComplete="off"/>
                                                <input type='text' className='label-input ant input' autoComplete="off"/>
                                                <input type='text' className='label-input ant input' autoComplete="off"/>
                                            </div>
                                             <div className='create-card-nym-section col-4'> derived words:
                                                <input type='text' className='label-input root input'  autoComplete="off"/>
                                                <input type='text' className='label-input root input'  autoComplete="off"/>
                                                <input type='text' className='label-input root input'  autoComplete="off"/>
                                            </div>
                                        </div>
                                </div>
                                </div>
                                <button className='create-card-btn' onClick={() => isCreatingCard(false)}>cancel</button>
                                <button className='create-card-btn' onClick={checkIfFilledOut}>save</button>
                             </div>
             </>
}