const express = require('express');
const app = express();
const path = require('path');

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/questions', (req, res) => {
    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" }
    ];
    res.json(questions);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
