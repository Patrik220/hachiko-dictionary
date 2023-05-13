import React from "react";

const QuizResultAnswers = ({ correctAnswers, incorrectAnswers }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4">
        <ul className="py-4">
          {incorrectAnswers.map((answer, index) => {
            return (
              <li
                key={index}
                className="bg-secondary text-white rounded-md p-2 my-2"
              >
                <b>Question</b>: {answer?.question?.description} <br />
                <b>Your Answer</b>: {answer?.yourAnswer} <br />
                <b>Correct Answer</b>: {answer?.question?.answer}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4">
        <ul className="py-4">
          {correctAnswers.map((answer, index) => {
            return (
              <li
                key={index}
                className="bg-primary text-white rounded-md p-2 my-2"
              >
                <b>Question</b>: {answer?.question?.description} <br />
                <b>Your Answer</b>: {answer?.yourAnswer} <br />
                <b>Correct Answer</b>: {answer?.question?.answer}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuizResultAnswers;
