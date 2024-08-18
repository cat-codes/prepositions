// Manages the state for displayed data (displayedData).
// Handles filter changes from Filter and sorting changes from Sort.

import React, { useState } from "react";
import "./List.scss";
import BackBtn from "./components/btn/BackBtn.jsx";
import Filter from "./components/btn/Filter.jsx";
import Sort from "./components/btn/Sort.jsx";
import Database from "./Database.jsx";

const List = () => {
  const [displayedData, setDisplayedData] = useState(Database); // Holds the data currently being displayed. Initially set to the entire Database.
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  //* Extracts unique levels, cases, and prepositions from the database
  const uniqueLevels = [...new Set(Database.map((entry) => entry.level))];
  const uniqueCases = [...new Set(Database.map((entry) => entry.case))];
  const uniquePrepositions = [
    ...new Set(Database.map((entry) => entry.preposition)),
  ];

  //* Updates the filteredData state based on the applied filters, then updates displayedData to reflect the filtered results.
  const handleFilterChange = (filters) => {
    // 'filters' object from Filter.jsx with current filter settings
    const filtered = Database.filter((entry) => {
      // 'filtered' - the result of filtering Database based on filters. This is a new array where each entry meets the criteria defined in filters.
      return (
        (filters.level === "" || entry.level === filters.level) && // 'filters.level === "": This checks if the level filter is empty (i.e., no specific level is selected). 'entry.level === filters.level: This checks if the entry’s level matches the selected filter value.
        (filters.case === "" || entry.case === filters.case) &&
        (filters.preposition === "" ||
          entry.preposition === filters.preposition)
      );
    });
    setDisplayedData(filtered); // Updates displayedData with the filtered results
  };

  //* Updates displayedData with the sorted data passed from the Sort component.
  const handleSortData = (sortedData) => {
    // 'sortedData' - the sorted data array, typically passed from the Sort component.
    setDisplayedData(sortedData); // Updates displayedData with the sorted data, ensuring that the displayed list reflects the new sorting order.
  };

  //* Toggles Filter
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) setIsSortOpen(false); // Close Sort if Filter is opened
  };

  //* Toggles sort
  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
    if (!isSortOpen) setIsFilterOpen(false); // Close Filter if Sort is opened
  };

  return (
    <div className="list">
      <BackBtn />
      <div className="list-controls">
        <Filter
          onFilterChange={handleFilterChange}
          isOpen={isFilterOpen}
          toggleFilter={toggleFilter}
          levels={uniqueLevels}
          cases={uniqueCases}
          prepositions={uniquePrepositions}
        />
        <Sort
          displayedData={displayedData}
          onSortData={handleSortData}
          isOpen={isSortOpen}
          toggleSort={toggleSort}
        />
      </div>
      <div className="list-contents">
        <ol>
          {displayedData.map((entry, index) => (
            <li key={index}>
              <p>
                <strong>
                  {entry.expression} + {entry.case}. ({entry.level}){" "}
                  <i>({entry.translation})</i>
                </strong>
              </p>
              <div>
                {entry.example.map((example, exampleIndex) => (
                  <div key={exampleIndex}>
                    <p>{example}</p>
                    <p>
                      <i>({entry.exampleEN[exampleIndex]})</i>
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default List;
