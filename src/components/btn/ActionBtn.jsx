import React from "react";
import "./ActionBtn.scss";

const ActionBtn = ({ ActionBtnText, disabled }) => {
  return (
    <button className="action-btn" disabled={disabled}>
      {ActionBtnText}
    </button>
  );
};

export default ActionBtn;
