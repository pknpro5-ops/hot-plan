
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

const QuizSkeleton: React.FC = () => (
  <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-3xl max-w-xl mx-auto relative overflow-hidden animate-pulse">
    <div className="mb-8">
      <div className="h-4 bg-slate-200 rounded w-1/4 mb-3"></div>
      <div className="h-8 bg-slate-300 rounded w-1/2"></div>
    </div>
    <div className="min-h-[280px] space-y-4">
      <div className="h-16 bg-slate-100 rounded-2xl"></div>
      <div className="h-16 bg-slate-100 rounded-2xl"></div>
      <div className="h-16 bg-slate-200 rounded-2xl mt-6"></div>
    </div>
  </div>
);

const Quiz = lazy(() => import('./components/Quiz'));

const quizElement = document.getElementById('quiz-root');
if (quizElement) {
  const root = ReactDOM.createRoot(quizElement);
  root.render(
    <React.StrictMode>
      <Suspense fallback={<QuizSkeleton />}>
        <Quiz />
      </Suspense>
    </React.StrictMode>
  );
}
