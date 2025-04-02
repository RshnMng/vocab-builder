import React, { useState, useEffect, useRef } from "react";
import utils from "../Utilities";
import DojoWordDisplay from "../components/dojo-word-display";
import DojoUserInput from "../components/dojo-user-input";
import DojoScoreboard from "../components/dojo-scoreboard";
import DojoAnswers from "../components/dojo-answers";
import WarningPopup from "../components/popup-warning";
import NextRoundPopup from "../components/popup-nextround";
import GameOverPopup from "../components/popup-gameover";
import CongratsPopup from "../components/popup-congrats";
import ExtraWordsPopup from "../components/popup-extra-words";

export default function Dojo(props) {
  const getFromLocal = utils.utils.getFromLocal;
  const saveToLocal = utils.utils.saveToLocal;
  const createRandomId = utils.utils.createRandomId;

  const deckInfo = props.props.deckInfo;

  const [randomIndex, setRandomIndex] = useState(0);
  const [selection, setSelection] = useState("same");
  const [label, setLabel] = useState("synonyms");
  const [maxShown, setMaxShown] = useState(6);
  const [userInput, setUserInput] = useState("");
  const [showPopup, isShowPopup] = useState(false);
  const [nextRoundPopup, isNextRoundPopup] = useState(false);
  const [gameOver, isGameOver] = useState(false);
  const [dojoStorage, setDojoStorage] = useState(getFromLocal("dojoStorage"));
  const [checkArr, setCheckArr] = useState([]);
  const [congrats, isCongrats] = useState(false);
  const [add, isAdd] = useState(false);
  const [nymDisplay, setNymDisplay] = useState([]);
  const [reqLength, setReqLength] = useState(getFromLocal("reqLength"));
  const [wrong, isWrong] = useState(false);

  let round = dojoStorage.round === 1 ? "training" : dojoStorage.round === 2 ? "double or nothing" : dojoStorage.round === 3 && "All In!!";

  function createRandomIndex() {
    let randomNumber = Math.floor(Math.random() * deckInfo.length);
    randomNumber === randomIndex ? createRandomIndex() : setRandomIndex(randomNumber);
  }

  function determineSynOrAnt() {
    let nym = ["same", "opposite"];
    let nymRandomNumber = Math.floor(Math.random() * 2);
    let selection = nym[nymRandomNumber];
    let label;

    selection === "same" ? (label = "synonyms") : (label = "antonyms");

    setSelection(selection);
    setLabel(label);
  }

  function generateNewWord() {
    isCongrats(false);
    isAdd(false);
    setNymDisplay([]);
    setCheckArr([]);
    setMaxShown(6);
    createRandomIndex();
    determineSynOrAnt();

    setDojoStorage((prevState) => {
      return { ...prevState, numberCorrect: 0, incorrect: 0, round: 1 };
    });
  }

  function stopDuplicates() {
    let results = [];
    let elements = document.getElementsByClassName("nym-choices");
    let elem = Array.from(elements);
    elem.map((el) => {
      let check = el.textContent === userInput;
      results.push(check);
    });

    let alreadyAnswered = results.includes(true);
    return alreadyAnswered;
  }

  function checkAnswer() {
    let duplicate = stopDuplicates();
    let correct = compareData();
    duplicate === false && correct === true ? handleCorrect() : handleIncorrect();
    setUserInput("");
  }

  function compareData() {
    let correct = deckInfo[randomIndex][selection].includes(userInput);
    return correct;
  }

  function handleCorrect() {
    randomizePlacement();
    determinePointsWon();

    saveToLocal("dojoStorage", dojoStorage);
  }

  function determinePointsWon() {
    let pointsWon;
    let numberCorrect = dojoStorage.numberCorrect + 1;

    numberCorrect <= 3 ? (pointsWon = dojoStorage.earlyPurse) : numberCorrect >= 4 && numberCorrect <= 7 ? (pointsWon = dojoStorage.medPurse) : numberCorrect >= 8 && numberCorrect <= 12 ? (pointsWon = dojoStorage.largePurse) : numberCorrect >= 13 && numberCorrect <= 16 ? (pointsWon = dojoStorage.hugePurse) : numberCorrect >= 17 ? (pointsWon = dojoStorage.megaPurse) : null;

    let totalPoints = dojoStorage.points + pointsWon;

    setDojoStorage((prevState) => {
      return { ...prevState, numberCorrect: numberCorrect, points: totalPoints };
    });
  }

  function randomizePlacement() {
    let randomNumber;
    deckInfo[randomIndex][selection].length < maxShown ? (randomNumber = Math.floor(Math.random() * deckInfo[randomIndex][selection].length)) : (randomNumber = Math.floor(Math.random() * maxShown));
    let elements = document.getElementsByClassName("nym-choices");
    let elem = Array.from(elements);
    let alreadyUsed = checkArr.includes(randomNumber);

    alreadyUsed ? randomizePlacement() : (elem[randomNumber].textContent = userInput);
    elem[randomNumber].classList.add("nym-answered");
    checkArr.push(randomNumber);
  }

  function handleX() {
    console.log(wrong, "inside handle");
    isWrong(false);
    setDojoStorage((prevState) => {
      return { ...prevState, incorrect: prevState.incorrect + 1 };
    });
  }

  function handleIncorrect() {
    isWrong(true);
  }

  function showNyms() {
    let newDisplay = [];

    if (maxShown === 6) {
      for (let i = 1; i <= maxShown && i <= deckInfo[randomIndex][selection].length; i++) {
        newDisplay.push(
          <div key={createRandomId()} className={"nym-choices"}>
            {i}
          </div>
        );
      }
    } else if (maxShown === 12) {
      for (let i = 7; i <= maxShown && i <= deckInfo[randomIndex][selection].length; i++) {
        newDisplay.push(
          <div key={createRandomId()} className={"nym-choices"}>
            {i}
          </div>
        );
      }
    } else if (maxShown === 18) {
      for (let i = 13; i <= maxShown && i <= deckInfo[randomIndex][selection].length; i++) {
        newDisplay.push(
          <div key={createRandomId()} className={"nym-choices"}>
            {i}
          </div>
        );
      }
    } else {
      for (let i = dojoStorage.numberCorrect + 1; i <= deckInfo[randomIndex][selection].length; i++) {
        newDisplay.push(
          <div key={createRandomId()} className={"nym-choices"}>
            {i}
          </div>
        );
      }
    }

    let fullDisplay = [...nymDisplay, ...newDisplay];
    setNymDisplay(fullDisplay);
    isAdd(false);
  }

  function updateUserInput(event) {
    setUserInput(event.target.value);
  }

  function handleShownAmount() {
    let amountToAdd = deckInfo[randomIndex][selection].length - dojoStorage.numberCorrect >= 6 ? 6 : deckInfo[randomIndex][selection].length - dojoStorage.numberCorrect;

    setMaxShown((prevState) => {
      return (prevState += amountToAdd);
    });
  }

  function failedChallenge() {
    isNextRoundPopup(true);
  }

  function acceptLoss() {
    dojoStorage.round === 1 &&
      setDojoStorage((prevState) => {
        return { ...prevState, incorrect: 0, round: 1, points: prevState.points - Math.floor(prevState.points * 0.25) };
      });

    dojoStorage.round === 2 &&
      setDojoStorage((prevState) => {
        return { ...prevState, incorrect: 0, round: 1, points: prevState.points - Math.floor(prevState.points * 0.5) };
      });

    dojoStorage.round === 3 &&
      setDojoStorage((prevState) => {
        return { ...prevState, incorrect: 0, round: 1, points: prevState.points - prevState.points };
      });
    isNextRoundPopup(false);
    changeWord();
  }

  function acceptChallenge() {
    setDojoStorage((prevState) => {
      return { ...prevState, incorrect: 0, round: prevState.round + 1 };
    });
    isNextRoundPopup(false);
  }

  function changeWord() {
    let wordsAmount = deckInfo.length;
    let randomNumber = Math.floor(Math.random() * wordsAmount);
    setNymDisplay([]);

    randomNumber === randomIndex ? changeWord() : setRandomIndex(randomNumber);
  }

  function runGameOver(data) {
    isGameOver(true);
    setDojoStorage((prevState) => {
      return { ...prevState, incorrect: 0, round: 1, numberCorrect: 0, points: 1000 };
    });
    data === "add" ? null : addDeckRequirement();
    console.log(deckInfo.length, "deckInfo");
  }

  function addDeckRequirement() {
    let requiredlength = deckInfo.length + 3;
    saveToLocal("reqLength", requiredlength);
  }

  useEffect(() => {
    deckInfo.length !== 0 && console.log(deckInfo[randomIndex][selection]);
    showNyms();
  }, [randomIndex]);

  useEffect(() => {
    dojoStorage.numberCorrect === deckInfo[randomIndex][selection].length ? isCongrats(true) : null;

    dojoStorage.numberCorrect === maxShown && maxShown !== deckInfo[randomIndex][selection].length ? isAdd(true) : null;
  }, [dojoStorage.numberCorrect]);

  useEffect(() => {
    wrong ? setTimeout(handleX, 1000) : null;
  }, [wrong]);

  useEffect(() => {
    add === true ? showNyms() : null;
  }, [maxShown]);

  useEffect(() => {
    dojoStorage.incorrect === 2 && isShowPopup(true);
    dojoStorage.incorrect === 3 && dojoStorage.round !== 3 && failedChallenge();
    dojoStorage.round === 3 && dojoStorage.incorrect === 3 ? runGameOver() : null;
    saveToLocal("dojoStorage", dojoStorage);
  }, [dojoStorage.incorrect]);

  useEffect(() => {
    saveToLocal("dojoStorage", dojoStorage);
  }, [dojoStorage]);

  //   useEffect(() => {
  //     // deckInfo.length >= reqLength === false ? runGameOver('add') : isGameOver(false);
  //   }, []);

  return (
    <>
      {" "}
      <div className="row">
        <div className="col-md-6 col-sm-12 ">
          <DojoWordDisplay props={{ deckInfo, randomIndex }} />
          <DojoUserInput props={{ generateNewWord, userInput, updateUserInput, showPopup, nextRoundPopup, gameOver, checkAnswer }} />
        </div>
        <div className="col-md-6 col-sm-12">
          <DojoScoreboard props={{ dojoStorage, round }} />
          <DojoAnswers props={{ label, nymDisplay }} />
        </div>
      </div>
      {wrong && (
        <div className="wrong-div">
          <audio id="audioPlayer" src="/216090__richerlandtv__bad-beep-incorrect.mp3" type="audio/mp3"></audio>
        </div>
      )}
      {showPopup && <WarningPopup props={{ dojoStorage, isShowPopup }} />}
      {nextRoundPopup && <NextRoundPopup props={{ dojoStorage, acceptChallenge, acceptLoss }} />}
      {gameOver && <GameOverPopup props={{ reqLength, deckInfo }} />}
      {congrats && <CongratsPopup props={{ dojoStorage, generateNewWord }} />}
      {add && <ExtraWordsPopup props={{ dojoStorage, label, deckInfo, randomIndex, selection, handleShownAmount, generateNewWord }} />}
    </>
  );
}
