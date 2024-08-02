const express = require("express");
const cors = require("cors");

// Initialize Express app
const app = express();
const port = 3001; // You can change this to any port you prefer

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors()); // Enable CORS

// Define a POST route
app.post("/bfhl", (req, res) => {
  const data = req.body.data || [];
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid data format" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestAlphabet = alphabets.reduce(
    (a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b),
    ""
  );

  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "your_college_email@example.com",
    roll_number: "YourRollNumber",
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
