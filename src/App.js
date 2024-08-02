import React, { useState } from "react";
import Select from "react-select";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      // Parse the JSON input
      const parsedJson = JSON.parse(jsonInput);
      console.log("Parsed JSON:", parsedJson); // Debugging statement

      // Send POST request to the backend
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/bfhl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedJson),
      });

      // Check if the response is okay
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse and set the response data
      const data = await res.json();
      console.log("Response data:", data);
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid JSON input or network error");
    }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected.map((option) => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const showNumbers = selectedOptions.includes("Numbers");
    const showAlphabets = selectedOptions.includes("Alphabets");
    const showHighestAlphabet = selectedOptions.includes("Highest Alphabet");

    return (
      <div className="response-container">
        {showNumbers && <div>Numbers: {numbers.join(",")}</div>}
        {showAlphabets && <div>Alphabets: {alphabets.join(",")}</div>}
        {showHighestAlphabet && (
          <div>Highest Alphabet: {highest_alphabet}</div>
        )}
      </div>
    );
  };

  const options = [
    { value: "Numbers", label: "Numbers" },
    { value: "Alphabets", label: "Alphabets" },
    { value: "Highest Alphabet", label: "Highest Alphabet" },
  ];

  return (
    <div className="App">
      <h1>RA2111003020372</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div className="multi-select-container">
          <Select
            isMulti
            name="filters"
            options={options}
            className="multi-select"
            classNamePrefix="select"
            onChange={handleDropdownChange}
          />
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
