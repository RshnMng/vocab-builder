import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import StudyDeck from "./pages/StudyDeck";
import Welcome from "./pages/Welcome";
import DojoLanding from "./components/dojo-landing.jsx";
import Landing from "./pages/Landing";
import LandingLayout from "./components/landing-layout";
import utils from "./Utilities.jsx";
import OpenAI from "openai";

function App() {
  let saveToLocal = utils.utils.saveToLocal;
  let getFromLocal = utils.utils.getFromLocal;
  let haveStorage = getFromLocal("studyDeck");
  let struggleStorage = getFromLocal("struggleDeck");
  let [userInput, setUserInput] = useState("");
  let [notFound, isNotFound] = useState(false);
  let [loading, isLoading] = useState(false);
  let [display, setDisplay] = useState("");
  let [searchedWord, setSearchedWord] = useState("");
  let [wordData, setWordData] = useState(null);
  let [likeWords, setLikeWords] = useState([]);
  let [currentWord, setCurrentWord] = useState({});
  let [fromLink, isFromLink] = useState(false);
  let apikey = import.meta.env.VITE_KEY;

  function initiateStorage() {
    saveToLocal("studyDeck", []);
    saveToLocal("struggleDeck", []);
    saveToLocal("favoritesDeck", []);
  }

  function initiateDojoStorage() {
    let dojoStorage = {
      points: 1000,
      earlyPurse: 100,
      medPurse: 250,
      largePurse: 400,
      hugePurse: 750,
      megaPurse: 1000,
      lossPenalty: 500,
      doubleOrNothing: 1000,
      incorrect: 0,
      round: 1,
      numberCorrect: 0,
      gameOver: false,
    };

    saveToLocal("dojoStorage", dojoStorage);
  }

  let openai = new OpenAI({
    apiKey: apikey,
    dangerouslyAllowBrowser: true,
  });

  const messages = [
    {
      role: "system",
      content:
        'You are a dictionary and word expert. You recieve the word or phrase given to you and you return a JSON object with at least 3 different possible definitions and thier grammatical part of speech and an example sentence, in an array of objects like [love: {word: love, definition: feeling affection for someone, partOfSpeech: verb, same: [like, be smitten, twitterpatted, enamored], opposite: [hate, dislike, despise], relatedWords: [love, loving, loved], example: `i love the way you smile at me in the mornings`}]. Make relatedWords any words of the same root like go, going, went, gone, goes etc; include past tense and any particles. Only provide a  RFC8259 compliant JSON response  following this format without deviation. give at least 5 synonyms and antonyms in the same and opposite arrays with no repeated words. Make sure everything is spelled correctly. Do not return any punctuation or words outside of the curly brackets of the object. if the word doesnt exist in the english language, return an array of words that are close to it, for example if you recieve "nife", return {notFound: [knife, night, knight, life, nine, strife]} in a RFC8259 compliant JSON response',
    },
    {
      role: "user",
      content: userInput,
    },
  ];

  async function getWord() {
    isNotFound(false);
    isLoading(true);
    setDisplay("");
    setSearchedWord(userInput);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    let wordObj = response.choices[0].message.content;

    let wordObjJson = wordObj.trim();
    let wordData = JSON.parse(wordObjJson);

    wordData.notFound === undefined ? isNotFound(false) : isNotFound(true);
    setWordData(wordData);

    wordData[userInput].map((obj) => {
      obj.synonyms ? (obj.same = obj.synonyms) : null;
      obj.antonyms ? (obj.opposite = obj.antonyms) : null;
    });

    setLikeWords(wordData[userInput][0].relatedWords);
    setCurrentWord(wordData);
  }

  useEffect(() => {
    haveStorage === null ? initiateStorage() : null;
    struggleStorage === null ? saveToLocal("struggleDeck", []) : null;
    initiateDojoStorage();
  }, []);
  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/landing" element={<Landing />} />
            <Route element={<LandingLayout />}>
              <Route path="/dictionary" element={<Dictionary props={{ getWord, userInput, setUserInput, type: "studyDeck", notFound, isNotFound, loading, isLoading, display, setDisplay, searchedWord, setSearchedWord, wordData, setWordData, likeWords, setLikeWords, currentWord, setCurrentWord, fromLink, isFromLink }} />} />

              <Route path="/study-deck" element={<StudyDeck props={{ getWord, userInput, setUserInput, type: "studyDeck", notFound, isNotFound, loading, isLoading, display, setDisplay, searchedWord, setSearchedWord, wordData, setWordData, likeWords, setLikeWords, currentWord, setCurrentWord, fromLink, isFromLink, label: "word search", deckType: "study" }} />} />

              <Route path="/struggle-deck" element={<StudyDeck props={{ getWord, userInput, setUserInput, type: "struggleDeck", notFound, isNotFound, loading, isLoading, display, setDisplay, searchedWord, setSearchedWord, wordData, setWordData, likeWords, setLikeWords, currentWord, setCurrentWord, label: "your study deck", deckType: "struggle", fromLink, isFromLink }} />} />

              <Route path="/dojo-landing" element={<DojoLanding />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
