import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from './data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let optionArray = [option1, option2, option3, option4];

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      optionArray.forEach((ref) => {
        if (ref.current) {
          ref.current.classList.remove("correct", "wrong");
        }
      });
    } else {
      setQuizCompleted(true);
    }
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      setLock(true);
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const handleReset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setQuizCompleted(false);
    optionArray.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("correct", "wrong");
      }
    });
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {quizCompleted ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} out of {data.length}</p>
          <button onClick={handleReset}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}.{question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={handleNext}>Next</button>
          <div className='index'>
            {index + 1} of {data.length} Question
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
