// Manages filter options and applies filters.

import React, { useState, useEffect, useRef } from "react";
import "./Filter.scss"; // Import your CSS file for styling
import FilterSvg from "/src/components/svg/FilterSvg.jsx";
import ActionBtn from "./ActionBtn";

const Filter = ({
  onFilterChange,
  isOpen,
  toggleFilter,
  levels,
  cases,
  prepositions,
}) => {
  const [filters, setFilters] = useState({
    // 'filters' - state variable that holds the current filter settings
    level: "",
    case: "",
    preposition: "",
  });

  const filterRef = useRef(null);

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      toggleFilter(); // Close the filter dropdown if clicking outside
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

  // 'handleFilterChange' updates the filters object. It uses the previous state (prevFilters) to ensure the update is based on the most recent state. It spreads the previous state into a new object and updates the specific filter type (level, case, or preposition) with the new value.If prevFilters was { level: "", case: "", preposition: "" }, after this operation, the new filters state becomes { level: "B1", case: "", preposition: "" }
  const handleFilterChange = (e, filterType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: e.target.value,
    }));
  };

  // 'handleApplyFilter calls onFilterChange with the current filters object, passing it up to List.jsx to update the filtered data.
  const handleApplyFilter = () => {
    onFilterChange(filters); // Takes filter state and passes to List.jsx
    toggleFilter(); // Closes dropdown after applying filter
  };

  return (
    <div className="filter" ref={filterRef}>
      <button className="filter-btn" onClick={toggleFilter}>
        <div className="svg">
          <FilterSvg />
        </div>
        <span>Filtern</span>
      </button>
      {isOpen && (
        <div className="filter-menu">
          <div className="filter-menu-group">
            <label>Niveau:</label>
            <select
              onChange={(e) => handleFilterChange(e, "level")}
              value={filters.level}
            >
              <option value="">Alle</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-menu-group">
            <label>Kasus:</label>
            <select
              onChange={(e) => handleFilterChange(e, "case")}
              value={filters.case}
            >
              <option value="">Alle</option>
              {cases.map((caseOption, index) => (
                <option key={index} value={caseOption}>
                  {caseOption}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-menu-group">
            <label>Präposition:</label>
            <select
              onChange={(e) => handleFilterChange(e, "preposition")}
              value={filters.preposition}
            >
              <option value="">Alle</option>
              {prepositions.map((preposition, index) => (
                <option key={index} value={preposition}>
                  {preposition}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleApplyFilter}>
            <ActionBtn ActionBtnText={"Übernehmen"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
