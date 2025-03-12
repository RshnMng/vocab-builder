import React, { useState } from "react";
import Dojo from "../pages/Dojo";
import utils from "../Utilities";

export default function DojoLanding() {
  const getFromLocal = utils.utils.getFromLocal;
  const [deckInfo, setDeckInfo] = useState(getFromLocal("studyDeck"));

  if (deckInfo.length === 0) {
    return (
      <div className="no-cards-dojo">
        <h1 className="no-cards-title">You have no cards saved in your study deck. Go to word search to add more words.</h1>
      </div>
    );
  } else {
    return <Dojo props={{ deckInfo }} />;
  }
}
