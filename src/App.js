import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://your-heroku-app.herokuapp.com/bfhl', JSON.parse(jsonInput));
            setResponseData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prev =>
            checked ? [...prev, value] : prev.filter(option => option !== value)
        );
    };

    return (
        <div>
            <h1>ABCD123</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows="10"
                    cols="30"
                />
                <button type="submit">Submit</button>
            </form>
            {responseData && (
                <div>
                    <div>
                        <input
                            type="checkbox"
                            value="Alphabets"
                            onChange={handleOptionChange}
                        /> Alphabets
                        <input
                            type="checkbox"
                            value="Numbers"
                            onChange={handleOptionChange}
                        /> Numbers
                        <input
                            type="checkbox"
                            value="Highest Alphabet"
                            onChange={handleOptionChange}
                        /> Highest Alphabet
                    </div>
                    <div>
                        {selectedOptions.includes('Alphabets') && (
                            <div>
                                <h2>Alphabets</h2>
                                <p>{responseData.alphabets.join(', ')}</p>
                            </div>
                        )}
                        {selectedOptions.includes('Numbers') && (
                            <div>
                                <h2>Numbers</h2>
                                <p>{responseData.numbers.join(', ')}</p>
                            </div>
                        )}
                        {selectedOptions.includes('Highest Alphabet') && (
                            <div>
                                <h2>Highest Alphabet</h2>
                                <p>{responseData.highest_alphabet.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
