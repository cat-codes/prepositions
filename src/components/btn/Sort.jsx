// Manages sort criteria and order, then sorts the data.

import React, { useState, useEffect, useRef } from "react";
import "./Sort.scss";
import SortSvg from "/src/components/svg/SortSvg.jsx";

const Sort = ({ displayedData, onSortData, isOpen, toggleSort }) => {
  const [sortCriteria, setSortCriteria] = useState("level");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sortRef.current && !sortRef.current.contains(event.target)) {
      toggleSort(); // Close the sort dropdown if clicking outside
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handles sort option click
  const handleSortOptionClick = (newCriteria) => {
    if (newCriteria === sortCriteria) {
      // Toggles sort order if the same criteria is selected
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Sets new sort criteria and default to ascending order
      setSortCriteria(newCriteria);
      setSortOrder("asc");
    }
    toggleSort(); // Closes dropdown after selecting an option
  };

  // Sorts data whenever sortCriteria or sortOrder changes
  useEffect(() => {
    const sortedData = [...displayedData].sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria])
        return sortOrder === "asc" ? -1 : 1;
      if (a[sortCriteria] > b[sortCriteria])
        return sortOrder === "asc" ? 1 : -1;
      return 0; // If equal
    });
    // Pass sorted data to parent component
    onSortData(sortedData); // Takes sortData state and passes to List.jsx
  }, [sortCriteria, sortOrder, displayedData, onSortData]);

  return (
    <div className="sort" ref={sortRef}>
      <button className="sort-btn" onClick={toggleSort}>
        <div className="svg">
          <SortSvg />
        </div>
        <span>Sortieren</span>
      </button>
      {isOpen && (
        <ul>
          <li onClick={() => handleSortOptionClick("level")}>
            Nach Level sortieren
          </li>
          <li onClick={() => handleSortOptionClick("case")}>
            Nach Kasus sortieren
          </li>
          <li onClick={() => handleSortOptionClick("preposition")}>
            Nach Präposition sortieren
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sort;
