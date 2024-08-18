import React, { useState, useEffect } from "react";
import "./Test.scss";
import { useLocation } from "react-router-dom";
import BackBtn from "./components/btn/BackBtn.jsx";
import ActionBtn from "./components/btn/ActionBtn.jsx";
import Database from "./Database.jsx";

const Test = () => {
  const location = useLocation();
  const selectedOptions = location.state?.selectedOptions || []; // Retrieves the selectedOptions from the location's state (Passed in Prestate.jsx). If no state is found, it defaults to an empty array

  const [examplesToShow, setExamplesToShow] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState({
    richtig: 0,
    falsch: 0,
    übersprungen: 0,
  });
  const [exampleStatus, setExampleStatus] = useState([]); // Array to track the status of each example
  const [finished, setFinished] = useState(false);

  //* Filters and shuffles examples based on selectedOptions
  useEffect(() => {
    const filteredExamples = Database.filter((databaseEntry) =>
      selectedOptions.includes(databaseEntry.level)
    );

    // Picks one example from each databaseEntry
    const selectedExamples = filteredExamples.map((databaseEntry) => {
      const randomIndex = Math.floor(
        Math.random() * databaseEntry.example.length
      );
      return databaseEntry.example[randomIndex];
    });

    // Shuffles the filtered examples
    const shuffledExamples = selectedExamples
      .map((example) => ({ example, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ example }) => example);

    // Sets examplesToShow with shuffledExamples
    setExamplesToShow(shuffledExamples);
  }, [selectedOptions]);

  //* Displays the sentence with an input field instead of the preposition
  const renderSentenceWithBlank = () => {
    const currentExample = examplesToShow[currentIndex];
    const currentEntry = Database.find((databaseEntry) =>
      databaseEntry.example.includes(currentExample)
    );

    if (currentEntry) {
      const preposition = currentEntry.preposition;

      // Escape special characters in the preposition for regex
      const escapedPreposition = preposition.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      const prepositionRegex = new RegExp(
        `(?<!\\w)${escapedPreposition}(?!\\w)`,
        "i"
      );

      const prepositionIndex = currentExample.search(prepositionRegex);
      if (prepositionIndex !== -1) {
        const prepositionLength = preposition.length;

        const beforePreposition = currentExample.substring(0, prepositionIndex);
        const afterPreposition = currentExample.substring(
          prepositionIndex + prepositionLength
        );

        return (
          <span>
            {beforePreposition}
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              style={{
                width: "50px",
                textAlign: "center",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "solid",
                borderWidth: "1px",
                background: "transparent",
              }}
            />
            {afterPreposition}
          </span>
        );
      }
    }
    return <span>{currentExample}</span>; // Fallback if no matching entry is found
  };

  //* Function to handle skipping the current example
  const handleSkip = () => {
    const currentExample = examplesToShow[currentIndex];
    setExampleStatus((prevStatus) => [
      ...prevStatus,
      { example: currentExample, status: "übersprungen" },
    ]);

    setCurrentIndex((prevIndex) => {
      if (prevIndex < examplesToShow.length - 1) {
        return prevIndex + 1;
      } else {
        setFinished(true);
      }
    });

    // Increments the skipped count within the score object
    setScore((prevScore) => ({
      ...prevScore,
      übersprungen: prevScore.übersprungen + 1,
    }));
    setUserInput("");
  };

  //* Function to handle moving to the next example
  const handleNext = () => {
    if (userInput.trim() !== "") {
      const currentExample = examplesToShow[currentIndex];
      const currentEntry = Database.find((databaseEntry) =>
        databaseEntry.example.includes(currentExample)
      );

      if (currentEntry) {
        const isCorrect =
          userInput.trim().toLowerCase() ===
          currentEntry.preposition.toLowerCase();

        setExampleStatus((prevStatus) => [
          ...prevStatus,
          {
            example: currentExample,
            status: isCorrect ? "richtig" : "falsch",
          },
        ]);

        // Update the score based on whether the answer was correct or wrong
        setScore((prevScore) => ({
          ...prevScore,
          richtig: isCorrect ? prevScore.richtig + 1 : prevScore.richtig,
          falsch: !isCorrect ? prevScore.falsch + 1 : prevScore.falsch,
        }));
      }

      setCurrentIndex((prevIndex) => {
        if (prevIndex < examplesToShow.length - 1) {
          return prevIndex + 1;
        } else {
          setFinished(true);
        }
      });
      setUserInput("");
    }
  };

  //* Handles input changes
  const handleInputChange = (e) => {
    setUserInput(e.target.value); // Updates userInput state
  };

  //* Handle key press events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevents the default action of the Enter key (e.g., form submission)
        handleNext(); // Calls the handleNext function
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput, currentIndex]); // Dependencies include userInput and currentIndex

  //* Helper function to determine the color for each status
  const getColorForStatus = (status) => {
    switch (status) {
      case "richtig":
        return "lightGreen";
      case "falsch":
        return "red";
      case "übersprungen":
        return "yellow";
      default:
        return "white";
    }
  };

  //* Calculate the current question number and how many questions are left
  const totalQuestions = examplesToShow.length;
  const currentQuestionNumber = currentIndex + 1;

  return (
    <div className="test">
      <BackBtn />
      {!finished ? (
        <div className="test-content">
          <p>
            Frage {currentQuestionNumber} von {totalQuestions}
          </p>
          <p>{renderSentenceWithBlank()}</p>
          <div className="test-content-controls">
            <button onClick={handleSkip}>
              <ActionBtn ActionBtnText={"Überspringen"} />
            </button>
            <button
              onClick={handleNext}
              disabled={userInput.trim() === ""}
              style={{
                opacity: userInput.trim() === "" ? 0.5 : 1,
                pointerEvents: userInput.trim() === "" ? "none" : "auto",
              }}
            >
              <ActionBtn ActionBtnText={"Nächste"} />
            </button>
          </div>
        </div>
      ) : (
        <div className="test-stats">
          <h2>Test beendet.</h2>
          <div className="test-stats-results">
            <p>Richtig: {score.richtig}</p>
            <p>Falsch: {score.falsch}</p>
            <p>Übersprungen: {score.übersprungen}</p>
          </div>
          <h3>Übersicht:</h3>
          <ol type="1">
            {exampleStatus.map((status, index) => (
              <li key={index}>
                {status.example} (
                <span style={{ color: getColorForStatus(status.status) }}>
                  {status.status}
                </span>
                )
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Test;
