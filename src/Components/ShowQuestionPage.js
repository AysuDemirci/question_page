import React, {useState } from "react";
import { Col, Container } from "reactstrap";
import { TbConfetti, TbMoodSad } from "react-icons/tb";

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
    <div>
      <Container>
        {!showResult ? (
          <Col md="10" style={{ marginTop: "5%", marginBottom: "7%" }}>
            {inputList.map((x, questionIndex) => {
              return (
                <div
                  style={{
                    border: "1px solid black",
                    marginBottom: "20px",
                    paddingTop: "15px",
                    borderRadius: "7px",
                  }}
                >
                  <ul
                    style={{ display: "flex", gap: "10px", listStyle: "none" }}
                    key={x.id}
                  >
                    <li>{questionIndex + 1}.</li>
                    <li>{x.question}</li>
                  </ul>
                  {x.answers.map((a, answerIndex) => (
                    <div>
                      <div>
                        <ul
                          style={{
                            listStyle: "none",
                            display: "flex",
                            gap: "10px",
                          }}
                          key={a.id}
                        >
                          <li>
                            <button
                              style={{
                                border:
                                  selectedAnswer[questionIndex] === answerIndex
                                    ? "2px solid green"
                                    : "2px solid gray",
                                borderRadius: "20px",
                                width: "30px",
                                backgroundColor:
                                  selectedAnswer[questionIndex] === answerIndex
                                    ? "green"
                                    : "white",
                              }}
                              onClick={() =>
                                handleAnswerClick(questionIndex, answerIndex)
                              }
                            >
                              {alphabet[answerIndex]}
                            </button>
                          </li>
                          <li style={{ marginTop: "1px" }}>{a.answer}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            <div>
              <button
                style={{
                  marginLeft: "40%",
                  width: "200px",
                  height: "45px",
                  border: "1px solid gray",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  compareAnswers();
                }}
              >
                Finish Test
              </button>
            </div>
          </Col>
        ) : (
          <div>
            <Col
              md="5"
              style={{
                marginTop: "15%",
                backgroundColor: "#fafafa",
                padding: "30px 0px 30px 40px",
                borderRadius: "10px",
                marginLeft: "30%",
                width: "700px",
                height: "500px",
              }}
            >
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
                    <TbMoodSad
                      className="confetti"
                      style={{
                        color: "#2857bd",
                        marginLeft: "1%",
                        marginBottom: "1%",
                      }}
                    />
                  </p>
                ) : (
                  <p>
                    Wow! You are good at it!
                    <TbConfetti
                      className="confetti"
                      style={{
                        color: "orange",
                        marginLeft: "2%",
                        marginBottom: "2%",
                      }}
                    />
                  </p>
                )}
              </div>
              <br />
              <br />
              <button
                style={{
                  marginLeft: "40%",
                  width: "130px",
                  height: "35px",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  restartGame();
                }}
              >
                Restart Test
              </button>
            </Col>
          </div>
        )}
      </Container>
    </div>
  );
}
