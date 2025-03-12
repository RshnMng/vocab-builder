import React from "react";
import { Link } from "react-router-dom";

export default function StudyDeckNyms(props) {
  const deckInfo = props.props.deckInfo;
  const index = props.props.index;
  const syns = props.props.syns;
  const ants = props.props.ants;
  const addNym = props.props.addNym;

  return (
    <>
      <div className="study-show-syns-div">
        {deckInfo[index].same.length === 0 ? null : <div className="study-deck-show-syn-label">synonyms</div>}
        {syns}
      </div>
      <div className="study-show-ants-div">
        {deckInfo[index].opposite.length === 0 ? null : <div className="study-deck-show-ant-label">antonyms</div>}
        {ants}
      </div>
      <div className="study-show-add-div">
        <Link to="#" onClick={() => addNym("synonym")}>
          add synonym
        </Link>
        <Link to="#" onClick={() => addNym("antonym")}>
          add antonym
        </Link>
      </div>
    </>
  );
}
