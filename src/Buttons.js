import React from "react";
import "./styles/Buttons.css";

const Buttons = ({ timeframe, setTimeframe }) => {
  const handleTimeframe = (event) => {
    setTimeframe(event.target.value);
    // console.log("event.target.value: ", event.target.value);
    // console.log("timeframe: ", { timeframe });
  };

  return (
    <div className="buttons-container">
      <button autoFocus value="long_term" onClick={handleTimeframe}>
        Past Year
      </button>
      <button value="medium_term" onClick={handleTimeframe}>
        Past 6 Months
      </button>
      <button value="short_term" onClick={handleTimeframe}>
        Past Month
      </button>
    </div>
  );
};

export default Buttons;
