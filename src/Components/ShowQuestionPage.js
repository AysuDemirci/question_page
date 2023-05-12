import React, { useState } from "react";
import { Col, Container } from "reactstrap";
import { TbConfetti, TbMoodSad } from "react-icons/tb";
import { VscDebugRestart } from "react-icons/vsc";

export default function ShowQuestionPage(props) {
  const { inputList, alphabet } = props;
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    emptyAnswers: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState(
    Array(inputList.length).fill(null)
  );

  const [showResult, setShowResult] = useState(false);

  function compareAnswers() {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let emptyAnswers = 0;

    inputList.forEach((question, questionIndex) => {
      const selectedAnswerIndex = selectedAnswer[questionIndex];
      const correctAnswerIndex = question.answers.findIndex(
        (answer) => answer.isCorrectAnswer
      );
      if (selectedAnswerIndex === null) {
        emptyAnswers++;
      } else if (selectedAnswerIndex === correctAnswerIndex) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    setResult({ correctAnswers, wrongAnswers, emptyAnswers });
    setShowResult(true);
  }

  function handleAnswerClick(questionIndex, answerIndex) {
    const list = [...selectedAnswer];
    list[questionIndex] = answerIndex;
    setSelectedAnswer(list);
  }
  function restartGame() {
    setResult({
      correctAnswers: 0,
      wrongAnswers: 0,
      emptyAnswers: 0,
    });
    setSelectedAnswer(Array(inputList.length).fill(null));

    setShowResult(false);
  }

  return (
    <div style={{ justifyContent: "center" }}>
      <Container>
        {!showResult ? (
          <Col md="10" className="showanswer-col">
            <center>
              <h3>Let's Begin!</h3>
            </center>

            <br />
            <br />
            {inputList.map((x, questionIndex) => {
              return (
                <div className="showanswer-div">
                  <ul className="showanswer-question-ul" key={x.id}>
                    <li style={{ fontWeight: "500" }}>{questionIndex + 1}.</li>
                    <li style={{ wordBreak: "break-word" }}>{x.question}</li>
                  </ul>
                  {x.answers.map((a, answerIndex) => (
                    <div>
                      <div>
                        <ul className="showanswer-question-ul" key={a.id}>
                          <li>
                            <button
                              className="alphabet-btn"
                              style={{
                                border:
                                  selectedAnswer[questionIndex] === answerIndex
                                    ? "2px solid #4fb945"
                                    : "2px solid gray",

                                backgroundColor:
                                  selectedAnswer[questionIndex] === answerIndex
                                    ? "#4fb945"
                                    : "white",
                              }}
                              onClick={() =>
                                handleAnswerClick(questionIndex, answerIndex)
                              }
                            >
                              {alphabet[answerIndex]}
                            </button>
                          </li>
                          <li
                            style={{ wordBreak: "break-word" }}
                            className="showanswer-li"
                          >
                            {a.answer}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            <div>
              <ul
                className="showanswer-return-finish"
                style={{
                  justifyContent: "center",
                }}
              >
                <li>
                  <button className="finishtest-btn">
                    <a className="showanswer-return" href="/*">
                      Return Question Page
                    </a>
                  </button>
                </li>
                <li>
                  <button
                    className="finishtest-btn"
                    onClick={() => {
                      compareAnswers();
                    }}
                  >
                    Finish Test
                  </button>
                </li>
              </ul>
            </div>
          </Col>
        ) : (
          <div>
            <center>
              <Col className="result-col" md="6">
                <br />
                <div style={{ textAlign: "center" }}>
                  <h2>Results</h2>
                  <br />
                  <p className="result-text">
                    Total Question : {inputList.length}
                  </p>
                  <p className="result-text">
                    Correct Answer : {result.correctAnswers}
                  </p>
                  <p className="result-text">
                    Wrong Answer : {result.wrongAnswers}
                  </p>
                  <p className="result-text">
                    Empty Answer : {result.emptyAnswers}
                  </p>

                  <p className="result-score-text">
                    Score :
                    {((result.correctAnswers / inputList.length) * 100).toFixed(
                      2
                    )}
                    %
                  </p>
                  {(result.correctAnswers / inputList.length) * 100 < 50 ? (
                    <p>
                      Try Harder!
                      <TbMoodSad className="confetti confetti-win" />
                    </p>
                  ) : (
                    <p>
                      Wow! You are good at it!
                      <TbConfetti className="confetti confetti-sad" />
                    </p>
                  )}
                </div>
                <br />
                <br />

                <button
                  className="restartgame-btn"
                  onClick={() => {
                    restartGame();
                  }}
                >
                  Restart Test
                  <VscDebugRestart className="restart-icon" />
                </button>
              </Col>
            </center>
          </div>
        )}
      </Container>
    </div>
  );
}
