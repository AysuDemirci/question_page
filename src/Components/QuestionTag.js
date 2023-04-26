import React, { useState } from "react";
import { Input, Row, Col, Container } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

export default function QuestionTag() {
  const [uniqueId, setUniqueId] = useState(uuidv4());
  const [questionUniqueId, setQuestionUniqueId] = useState(uuidv4());
  const [inputList, setInputList] = useState([
    { id: "0", question: "", answers: [{ id: "0", answer: "" }] },
  ]);
  const [alphabet, setAlphabet] = useState(["A"]);

  function handleInputChange(e, index) {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  }

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        id: questionUniqueId,
        question: "",
        answers: [{ id: uniqueId, answer: "" }],
      },
    ]);
    setUniqueId(uuidv4());
    setQuestionUniqueId(uuidv4());
  };

  const alphabetMapping = () => {
    let newChar = String.fromCharCode(
      alphabet[alphabet.length - 1].charCodeAt(0) + 1
    );
    let newChars = alphabet.concat(newChar);
    setAlphabet(newChars);
  };
  const handleAnswerAddClick = (index) => {
    const list = [...inputList];
    const newAnswers = [...list[index].answers, { id: uniqueId, answer: "" }];
    list[index].answers = newAnswers;
    setInputList(list);
    setUniqueId(uuidv4());
    // setIdCounter(idCounter + 1);
  };
  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const list = [...inputList];
    const question = list[questionIndex];
    const answer = question.answers[answerIndex];
    answer[name] = value;
    setInputList(list);
  };
  const handleAnswerRemoveClick = (questionIndex, answerIndex) => {
    const list = [...inputList];
    const question = list[questionIndex];
    question.answers.splice(answerIndex, 1);
    setInputList(list);
  };

  return (
    <Container>
      <div>
        {inputList.map((x, i) => {
          console.log(inputList);
          return (
            <div>
              <Col md="8" style={{ marginLeft: "20px" }}>
                <ul
                  key={x.id}
                  style={{
                    display: "flex",
                    gap: "10px",
                    listStyle: "none",
                    marginLeft: "500px",
                  }}
                >
                  <li>
                    {" "}
                    {inputList.length - 1 === i && (
                      <button
                        style={{ marginLeft: "200px" }}
                        className="question-btn2"
                        onClick={handleAddClick}
                      >
                        Add
                      </button>
                    )}
                  </li>
                  <li>
                    {inputList.length !== 1 && (
                      <button
                        className="question-btn"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                </ul>

                <Row className="question-row-style">
                  <ul
                    key={x.id}
                    style={{ listStyle: "none", display: "flex", gap: "20px" }}
                  >
                    <label style={{ marginTop: "5px", marginLeft: "5px" }}>
                      {i + 1}.
                    </label>
                    <li>
                      <Input
                        style={{
                          width: "700px",
                          marginBottom: "15px",
                        }}
                        name="question"
                        placeholder="Enter Question"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        value={x.question}
                      />
                    </li>
                  </ul>

                  {x.answers.map((answer, answerIndex) => (
                    <div>
                      <Row>
                        <ul
                          key={answer.id}
                          style={{
                            display: "flex",
                            gap: "20px",
                            listStyle: "none",
                          }}
                        >
                          <label
                            style={{ marginLeft: "40px", marginTop: "5px" }}
                          >
                            {alphabet[answerIndex]}
                          </label>
                          <li>
                            <Input
                              style={{
                                width: "500px",
                                marginBottom: "15px",
                              }}
                              name="answer"
                              placeholder="Enter Answer"
                              onChange={(e) =>
                                handleAnswerChange(e, i, answerIndex)
                              }
                              value={answer.answer}
                            />
                          </li>

                          <li>
                            {x.answers.length === 5 &&
                            x.answers.length === answerIndex + 1 ? (
                              <button className="answer-btn" disabled>
                                +
                              </button>
                            ) : (
                              x.answers.length === answerIndex + 1 && (
                                <button
                                  className="answer-btn"
                                  onClick={() => {
                                    alphabetMapping();
                                    handleAnswerAddClick(i);
                                  }}
                                >
                                  +
                                </button>
                              )
                            )}
                          </li>

                          <li>
                            {x.answers.length !== 1 && (
                              <button
                                className="answer-btn2"
                                onClick={() =>
                                  handleAnswerRemoveClick(i, answerIndex)
                                }
                              >
                                <strong>x</strong>
                              </button>
                            )}
                          </li>
                        </ul>
                      </Row>
                    </div>
                  ))}
                </Row>
                <br />
              </Col>
              <br />
              <br />
            </div>
          );
        })}

        <br />
      </div>
    </Container>
  );
}
