import React from "react";
import "./SelectBtn.scss";

const SelectBtn = ({
  SelectBtnText, // Allows to set the button text based on the context (passed as prop)
  onClick, // Executes a defined onCLick function (passed as prop)
  isSelected, // Stores the state of the button (passed as prop)
}) => {
  return (
    <button
      className={`select-btn ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {SelectBtnText}
    </button>
  );
};

export default SelectBtn;
