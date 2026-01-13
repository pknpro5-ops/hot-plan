
import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from './components/Quiz';

const quizElement = document.getElementById('quiz-root');
if (quizElement) {
  const root = ReactDOM.createRoot(quizElement);
  root.render(
    <React.StrictMode>
      <Quiz />
    </React.StrictMode>
  );
}
