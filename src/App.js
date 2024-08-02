import React, { useState } from "react";
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
      const res = await fetch("http://localhost:3001/bfhl", {
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
      console.log("Response data:", data); // Debugging statement
      setResponse(data);
    } catch (error) {
      console.error("Error:", error); // Debugging statement
      alert("Invalid JSON input or network error");
    }
  };

  const handleDropdownChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const showNumbers = selectedOptions.includes("Numbers");
    const showAlphabets = selectedOptions.includes("Alphabets");
    const showHighestAlphabet = selectedOptions.includes("Highest Alphabet");

    return (
      <div>
        {showNumbers && <div>Numbers: {JSON.stringify(numbers)}</div>}
        {showAlphabets && <div>Alphabets: {JSON.stringify(alphabets)}</div>}
        {showHighestAlphabet && (
          <div>Highest Alphabet: {JSON.stringify(highest_alphabet)}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>YourRollNumber</h1>
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
        <select multiple={true} onChange={handleDropdownChange}>
          <option value="Numbers">Numbers</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Highest Alphabet">Highest Alphabet</option>
        </select>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
