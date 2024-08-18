import React, { useState } from "react";
import "./Pretest.scss";
import { Link } from "react-router-dom";
import BackBtn from "./components/btn/BackBtn.jsx";
import SelectBtn from "./components/btn/SelectBtn.jsx";
import ActionBtn from "./components/btn/ActionBtn.jsx";

const Pretest = () => {
  // Manages the selected options array
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Toggles the presence of an option in the array
  const handleOptionClick = (currentOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(currentOption)) {
        // Removes the option if it's already selected
        return prevSelectedOptions.filter(
          (prevOption) => prevOption !== currentOption
        );
      } else {
        // Add the option if it's not selected
        return [...prevSelectedOptions, currentOption];
      }
    });
  };

  return (
    <div className="pretest">
      <BackBtn />
      <div className="pretest-content">
        <h2>
          Wählen Sie bitte aus, zu welchen Präpositionen Sie sich testen
          möchten.
        </h2>
        <div className="pretest-content-grid">
          <SelectBtn
            SelectBtnText={"A1"}
            onClick={() => handleOptionClick("A1")}
            isSelected={selectedOptions.includes("A1")} // If the option is in selectedOptions array, it'll return "true" (see SelectBtn page)
          />
          <SelectBtn
            SelectBtnText={"A2"}
            onClick={() => handleOptionClick("A2")}
            isSelected={selectedOptions.includes("A2")}
          />
          <SelectBtn
            SelectBtnText={"B1"}
            onClick={() => handleOptionClick("B1")}
            isSelected={selectedOptions.includes("B1")}
          />
          <SelectBtn
            SelectBtnText={"B2"}
            onClick={() => handleOptionClick("B2")}
            isSelected={selectedOptions.includes("B2")}
          />
          <SelectBtn
            SelectBtnText={"C1"}
            onClick={() => handleOptionClick("C1")}
            isSelected={selectedOptions.includes("C1")}
          />
          <SelectBtn
            SelectBtnText={"C2"}
            onClick={() => handleOptionClick("C2")}
            isSelected={selectedOptions.includes("C2")}
          />
        </div>
        <Link
          to="/test"
          state={{ selectedOptions }} // Passing of selected options
        >
          <ActionBtn
            ActionBtnText={"Test Starten"}
            disabled={selectedOptions.length === 0}
            style={{
              opacity: selectedOptions.length === 0 ? 0.5 : 1,
              borderBottom:
                selectedOptions.length === 0
                  ? "rgba(255, 255, 255, 0.5)"
                  : "white",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Pretest;
