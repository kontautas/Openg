////////------------------------------------MANO MODIFIKUOTA----------------------------------------//////////

import React from "react";

const Popup = ({ selectedWord, won, endgame }) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";

  if (endgame) {
    if (won === "win") {
      finalMessage = "Congratulations! You won! 😃";
    } else {
      finalMessage = "Unfortunately you lost. 😕";
      finalMessageRevealWord = `...the word was: ${selectedWord}`;
    }
  }

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
