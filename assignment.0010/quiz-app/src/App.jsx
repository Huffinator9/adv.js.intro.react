import { useState, useEffect } from 'react';
import axios from 'axios';

const categories = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Books' },
  { id: 11, name: 'Film' },
  { id: 12, name: 'Music' },
  { id: 15, name: 'Video Games' },
  // Add more categories from https://opentdb.com/api_category.php
];

const difficulties = ['easy', 'medium', 'hard'];

function App() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(9); // Default to General Knowledge
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch question from Open Trivia Database API
  const fetchQuestion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 1,
          category,
          difficulty,
          type: 'multiple',
        },
      });
      const data = response.data.results[0];
      // Shuffle answers
      const answers = [...data.incorrect_answers, data.correct_answer].sort(
        () => Math.random() - 0.5
      );
      setQuestion({
        ...data,
        answers,
      });
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch question');
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    setShowWelcome(false);
    fetchQuestion();
  };

  // Decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Handle answer selection
  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  // Restart quiz
  const handleRestart = () => {
    setShowWelcome(true);
    setQuestion(null);
    setSelectedAnswer(null);
    setError(null);
  };

  return (
    <div className="app">
      {showWelcome ? (
        <div className="welcome">
          <h2>Welcome to the Quiz</h2>
          <form onSubmit={handleStartQuiz}>
            <div className="form-group">
              <label htmlFor="name">First Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Start Quiz</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="question">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <div>
              <p className="error">{error}</p>
              <button onClick={handleRestart}>Back to Welcome</button>
            </div>
          ) : question ? (
            <>
              <h2>{name}'s Quiz</h2>
              <h3>{decodeHtml(question.question)}</h3>
              <form className="answers">
                {question.answers.map((answer, index) => (
                  <div key={index} className="answer-option">
                    <input
                      type="radio"
                      id={`answer-${index}`}
                      name="answer"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={handleAnswerChange}
                      disabled={!!selectedAnswer}
                    />
                    <label htmlFor={`answer-${index}`}>
                      {decodeHtml(answer)}
                    </label>
                  </div>
                ))}
              </form>
              {selectedAnswer && (
                <div className="result">
                  <p>
                    {selectedAnswer === question.correct_answer
                      ? 'Correct!'
                      : `Incorrect. The correct answer was: ${decodeHtml(question.correct_answer)}`}
                  </p>
                  <button onClick={handleRestart}>Back to Welcome</button>
                </div>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
