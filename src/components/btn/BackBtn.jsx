import React from "react";
import "./BackBtn.scss";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../svg/ArrowLeft";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button className="back" onClick={() => navigate(-1)}>
      <div className="svg">
        <ArrowLeft />
      </div>
      <div>Back</div>
    </button>
  );
};

export default BackBtn;
