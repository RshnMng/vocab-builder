import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateCard from "../components/createcard";
import utils from "../Utilities";
import { MdCancelPresentation } from "react-icons/md";
import EmptyDeck from "../components/emptydeck";
import FrontCard from "../components/frontcard";
import BackCard from "../components/backcard";

export default function StudyDeck(props) {
  const getFromLocal = utils.utils.getFromLocal;
  const createRandomId = utils.utils.createRandomId;
  const saveToLocal = utils.utils.saveToLocal;

  const [deckInfo, setDeckInfo] = useState(getFromLocal(props.props.type));
  const [index, setIndex] = useState(0);
  const [showAnswer, isShowAnswer] = useState(false);
  const [syns, setSyns] = useState([]);
  const [ants, setAnts] = useState([]);
  const [duplicate, isDuplicate] = useState(false);
  const [addStruggle, isAddStruggle] = useState(false);
  const [struggleDuplicate, isStuggleDuplicate] = useState(false);
  const [cardsInDeck, setCardsInDeck] = useState(deckInfo.length);
  const [creatingCard, isCreatingCard] = useState(false);
  const [wordSaved, isWordSaved] = useState(false);
  const [add, isAdd] = useState(false);
  const [nymType, setNymType] = useState("");
  const [userText, setUserText] = useState("");
  const [editing, isEditing] = useState(false);
  const type = props.props.type;
  const [otherDeck, setOtherDeck] = useState([]);

  const setUserInput = props.props.setUserInput;
  const isLoading = props.props.isLoading;
  const label = props.props.label;
  const deckType = props.props.deckType;
  const isFromLink = props.props.isFromLink;
  const fromLink = props.props.fromLink;
  const setWordData = props.props.setWordData;

  function increaseIndex() {
    deckInfo.length === index + 1 ? setIndex(0) : setIndex((prevState) => prevState + 1);
    isShowAnswer(false);
    isAddStruggle(false);
  }

  function decreaseIndex() {
    index === 0 ? setIndex(deckInfo.length - 1) : setIndex((prevState) => prevState - 1);
    isShowAnswer(false);
  }

  function showDefnintion() {
    isShowAnswer(!showAnswer);
    displayNyms();
  }

  function handleNymButton(event) {
    let nym = event.target.id;
    isLoading(true);
    setUserInput(nym);
    isFromLink(true);
  }

  function displaySavedSyns() {
    return deckInfo[index].same.map((syn) => {
      return (
        <Link onClick={(event) => handleNymButton(event)} to={editing ? "#" : "/dictionary"} key={createRandomId()}>
          <button className={editing ? "study-deck-show-syn edit" : "study-deck-show-syn"} id={syn}>
            {syn}
            {editing && <MdCancelPresentation id={syn} className="cancel-logo-syn" onClick={(event) => handleDelete(event, "same")} />}
          </button>
        </Link>
      );
    });
  }

  function displaySavedAnts() {
    return deckInfo[index].opposite.map((ant) => {
      return (
        <Link className="ant-links" onClick={(event) => handleNymButton(event)} to={editing ? "#" : "/dictionary"} key={createRandomId()}>
          {" "}
          <button key={createRandomId()} className={editing ? "study-deck-show-ant edit" : "study-deck-show-ant"} id={ant}>
            {ant}
            {editing && <MdCancelPresentation id={ant} className="cancel-logo-ant" onClick={(event) => handleDelete(event, "opposite")} />}
          </button>
        </Link>
      );
    });
  }

  function displayNyms() {
    let syns = displaySavedSyns();
    let ants = displaySavedAnts();

    setAnts(ants);
    setSyns(syns);
  }

  function handleDuplicates() {
    let duplicate;
    let newArr = deckInfo.filter((element) => {
      return element.word === deckInfo[index].word && element.partOfSpeech === deckInfo[index].partOfSpeech;
    });
    newArr.length > 1 ? (duplicate = true) : (duplicate = false);
    return duplicate;
  }

  function handleWrongAnswer() {
    type === "studyDeck" ? (deckInfo[index].incorrect = deckInfo[index].incorrect + 1) : null;
    saveToLocal("studyDeck", deckInfo);
    deckInfo[index].incorrect >= 3 ? isAddStruggle(true) : increaseIndex();
    isAdd(false);
  }

  function handleRightAnswer() {
    resetCorrectCount();
    increaseIndex();
    isAdd(false);
  }

  function resetCorrectCount() {
    deckInfo[index].incorrect = 0;
    saveToLocal("studyDeck", deckInfo);
  }

  function handleGoToStruggleDeck() {
    isStuggleDuplicate(false);
    isAddStruggle(false);
    resetCorrectCount();
  }

  let strugglePopup = (
    <div className="add-struggle-popup">
      <h1 className="add-struggle-title">WORD ADDED TO STRUGGLE DECK</h1>
      <Link to="/struggle-deck" onClick={handleGoToStruggleDeck}>
        <button className="add-struggle-btn">go to struggle deck</button>
      </Link>
      <button
        className="add-struggle-btn"
        onClick={() => {
          resetCorrectCount();
          increaseIndex();
          isStuggleDuplicate(false);
        }}
      >
        go to next card
      </button>
    </div>
  );

  let alreadyAddedPopup = (
    <div style={{ marginBottom: "30px" }} className="add-struggle-popup">
      <h1 className="add-struggle-title">THIS WORD IS ALREADY IN YOUR STRUGGLE DECK</h1>
      <Link to="/struggle-deck" onClick={handleGoToStruggleDeck}>
        <button className="add-struggle-btn">go to struggle deck</button>
      </Link>
      <button
        className="add-struggle-btn"
        onClick={() => {
          resetCorrectCount();
          increaseIndex();
          isStuggleDuplicate(false);
        }}
      >
        go to next card
      </button>
    </div>
  );

  function isInStruggleDeck(struggleInfo) {
    let results = [];

    struggleInfo.map((word) => {
      let result = word.definition === deckInfo[index].definition;
      results.push(result);
    });

    let inDeck = results.includes(true);

    return inDeck;
  }

  function addToStuggleDeck() {
    let struggleDeck = getFromLocal("struggleDeck");
    let inDeck = isInStruggleDeck(struggleDeck);

    let addWord = deckInfo[index];
    addWord.incorrect = 0;

    inDeck === true ? isStuggleDuplicate(true) : struggleDeck.unshift(addWord);

    saveToLocal("struggleDeck", struggleDeck);
  }

  function deleteCard() {
    isAdd(false);
    let studyDeck = getFromLocal(type);
    let filteredArr = studyDeck.filter((word) => {
      return word.definition !== deckInfo[index].definition;
    });

    setDeckInfo(filteredArr);
    saveToLocal(type, filteredArr);
    index - 1 === 0 ? (index = filteredArr.length) : index - 1;
    setIndex(index);
    setCardsInDeck(filteredArr.length);
  }

  function createCard() {
    isWordSaved(false);
    isCreatingCard(true);
    isAdd(false);
  }

  let createCardPopup = <CreateCard props={{ getFromLocal, saveToLocal, isCreatingCard, setDeckInfo, wordSaved, isWordSaved }} />;

  function addNym(nymType) {
    setNymType(nymType);
    isAdd(true);
    isCreatingCard(false);
  }

  function updateUserText(event) {
    setUserText(event.target.value);
  }

  function updateNymInfo(nymLabel) {
    let arrayToEdit = deckInfo[index][nymLabel];
    arrayToEdit.push(userText);
    deckInfo[index][nymLabel] = arrayToEdit;

    let newDeck = deckInfo;

    isWordSaved(true);
    setDeckInfo([...newDeck]);
    isAdd(false);
    setUserText("");

    saveToLocal(type, deckInfo);

    let otherDeckTitle;

    type === "struggleDeck" ? (otherDeckTitle = "studyDeck") : (otherDeckTitle = "struggleDeck");

    let otherDeck = getFromLocal(otherDeckTitle);

    let newOtherDeck = otherDeck.map((obj) => {
      return obj.word === deckInfo[index].word ? (obj = deckInfo[index]) : obj;
    });

    saveToLocal(otherDeckTitle, newOtherDeck);
  }

  function saveUserText() {
    nymType === "synonym" ? updateNymInfo("same") : updateNymInfo("opposite");
  }

  function handleEditing() {
    isEditing(true);
  }

  function handleDelete(event, deleteType) {
    isWordSaved(true);
    let word = event.target.id;
    let thisArray = deckInfo[index][deleteType];
    let newArray = thisArray.filter((item) => {
      return item !== word;
    });

    deckInfo[index][deleteType] = newArray;

    setDeckInfo((prevState) => {
      return [...prevState];
    });
  }

  function saveChanges() {
    isEditing(false);
    isFromLink(true);
    saveToLocal(type, deckInfo);

    let otherDeckTitle;

    type === "struggleDeck" ? (otherDeckTitle = "studyDeck") : (otherDeckTitle = "struggleDeck");

    let otherDeck = getFromLocal(otherDeckTitle);

    let newOtherDeck = otherDeck.map((obj) => {
      return obj.word === deckInfo[index].word ? (obj = deckInfo[index]) : obj;
    });

    saveToLocal(otherDeckTitle, newOtherDeck);
  }

  function cancelChanges() {
    let originalDeck = getFromLocal(type);
    setDeckInfo(originalDeck);
    displayNyms();
    isEditing(false);
  }

  function cancelNymAdd() {
    isAdd(false);
  }

  useEffect(() => {
    let duplicate = handleDuplicates();
    isDuplicate(duplicate);

    addStruggle && addToStuggleDeck();
  }, [index, addStruggle]);

  useEffect(() => {
    cardsInDeck !== 0 && wordSaved && displayNyms();
  }, [deckInfo]);

  useEffect(() => {
    cardsInDeck !== 0 && displayNyms();
  }, [editing]);

  useEffect(() => {
    setWordData(null);
  }, []);

  useEffect(() => {
    let currentDeck = getFromLocal(props.props.type);
    setCardsInDeck(currentDeck.length);
    setDeckInfo(currentDeck);
    isShowAnswer(false);
    setIndex(0);
  }, [type]);

  if (cardsInDeck === 0) {
    return <EmptyDeck props={{ createCard, creatingCard, createCardPopup, deckType, label }} />;
  }
  return (
    <>
      {showAnswer === false ? (
        <FrontCard props={{ deleteCard, createCard, creatingCard, createCardPopup, deckInfo, index, duplicate, decreaseIndex, increaseIndex, showDefnintion }} />
      ) : (
        <BackCard props={{ deleteCard, createCard, editing, saveChanges, handleEditing, cancelChanges, deckInfo, index, addStruggle, creatingCard, createCardPopup, add, nymType, updateUserText, saveUserText, cancelNymAdd, syns, ants, addNym, handleRightAnswer, handleWrongAnswer, struggleDuplicate, strugglePopup, alreadyAddedPopup, userText, type }} />
      )}
    </>
  );
}
