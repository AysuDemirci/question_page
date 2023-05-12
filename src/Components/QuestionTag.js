import React, { useEffect, useState } from "react";
import { Input, Row, Col, Container } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { FaCheck, FaTimesCircle, FaPlusCircle } from "react-icons/fa";

import Pagination from "./Pagination";
import { Route, Routes } from "react-router-dom";
import ShowQuestionPage from "./ShowQuestionPage";

export default function QuestionTag() {
  const [uniqueId, setUniqueId] = useState(uuidv4());
  const [questionUniqueId, setQuestionUniqueId] = useState(uuidv4());
  const [inputList, setInputList] = useState([
    {
      id: "0",
      question: "",
      answers: [{ id: "0", answer: "", isCorrectAnswer: false }],
    },
  ]);
  const [alphabet, setAlphabet] = useState(["A"]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentInputList = inputList.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function correctAnswer(questionIndex, answerIndex) {
    const updatedInputList = [...inputList];
    updatedInputList[questionIndex + indexOfFirstPost].answers.forEach(
      (answer, index) => {
        if (index === answerIndex) {
          answer.isCorrectAnswer = !answer.isCorrectAnswer;
        } else {
          answer.isCorrectAnswer = false;
        }
      }
    );
    setInputList(updatedInputList);

    sessionStorage.setItem("inputList", JSON.stringify(updatedInputList));
  }

  function handleInputChange(e, index) {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index + indexOfFirstPost][name] = value;
    setInputList(list);
    sessionStorage.setItem("inputList", JSON.stringify(list));
  }

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index + indexOfFirstPost, 1);
    setInputList(list);
    sessionStorage.setItem("inputList", JSON.stringify(list));
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        id: questionUniqueId,
        question: "",
        answers: [{ id: uniqueId, answer: "", isCorrectAnswer: false }],
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
    sessionStorage.setItem("alphabetList", JSON.stringify(newChars));
  };
  const handleAnswerAddClick = (index) => {
    const list = [...inputList];
    const newAnswers = [
      ...list[index + indexOfFirstPost].answers,
      { id: uniqueId, answer: "", isCorrectAnswer: false },
    ];
    list[index + indexOfFirstPost].answers = newAnswers;
    setInputList(list);
    setUniqueId(uuidv4());
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const list = [...inputList];
    const question = list[questionIndex + indexOfFirstPost];
    const answer = question.answers[answerIndex];
    answer[name] = value;
    setInputList(list);

    sessionStorage.setItem("inputList", JSON.stringify(list));
  };
  const handleAnswerRemoveClick = (questionIndex, answerIndex) => {
    const list = [...inputList];
    const question = list[questionIndex + indexOfFirstPost];
    question.answers.splice(answerIndex, 1);
    setInputList(list);
    sessionStorage.setItem("inputList", JSON.stringify(list));
  };

  useEffect(() => {
    const storedInputList = sessionStorage.getItem("inputList");
    if (storedInputList) {
      setInputList(JSON.parse(storedInputList));
    }
    const storedAlphabet = sessionStorage.getItem("alphabetList");
    if (storedAlphabet) {
      setAlphabet(JSON.parse(storedAlphabet));
    }
  }, []);

  return (
    <Container>
      <div>
        <Routes>
          <Route
            exact
            path="/*"
            element={
              <div>
                <br />
                <br />
                <h3 className="questiontag-header">Create A Question!</h3>
                <br />
                <h6 className="questiontag-header">
                  If you want to add more questions, please click Add button.
                </h6>
                <br />
                {currentInputList.map((x, i) => {
                  return (
                    <div>
                      <Col
                        md="10"
                        className="questiontag-col"
                        style={{ justifyContent: "center" }}
                      >
                        <ul key={x.id} className="questiontag-ul">
                          <li>
                            {currentInputList.length !==
                              1 + indexOfFirstPost && (
                              <button
                                className="question-btn"
                                onClick={() =>
                                  handleRemoveClick(i, indexOfFirstPost)
                                }
                              >
                                Remove
                              </button>
                            )}
                          </li>
                          <li>
                            {currentInputList.length - 1 === i && (
                              <button
                                className="question-btn2"
                                onClick={handleAddClick}
                              >
                                Add
                              </button>
                            )}
                          </li>
                        </ul>

                        <Row className="question-row-style">
                          <ul key={x.id} className="questiontag-row-ul">
                            <label className="questiontag-row-label">
                              {i + indexOfFirstPost + 1}.
                            </label>
                            <li>
                              <Input
                                className="questiontag-question-input"
                                style={{
                                  width: "700px",
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
                                  className="questiontag-answer-ul"
                                >
                                  <li>
                                    <button
                                      onClick={() => {
                                        correctAnswer(i, answerIndex);
                                      }}
                                      style={{
                                        marginLeft: "35px",
                                        width: "30px",
                                        borderRadius: "10px",
                                        border: answer.isCorrectAnswer
                                          ? "2px solid green"
                                          : "2px solid gray",
                                        backgroundColor: "white",
                                        marginTop: "4px",
                                      }}
                                    >
                                      <FaCheck
                                        style={{
                                          textAlign: "center",
                                          margin: "-2px 0px 0px -1px",
                                          color: answer.isCorrectAnswer
                                            ? "green"
                                            : "gray",
                                        }}
                                      />
                                    </button>
                                  </li>
                                  <li>
                                    <label className="questiontag-answer-label">
                                      {alphabet[answerIndex]}
                                    </label>
                                  </li>

                                  <li>
                                    <Input
                                      className="questiontag-answer-input"
                                      style={{ width: "500px" }}
                                      name="answer"
                                      placeholder="Enter Answer"
                                      onChange={(e) =>
                                        handleAnswerChange(e, i, answerIndex)
                                      }
                                      value={answer.answer}
                                    />
                                  </li>
                                  <li>
                                    {x.answers.length !== 1 && (
                                      <button
                                        className="answer-btn2"
                                        onClick={() =>
                                          handleAnswerRemoveClick(
                                            i,
                                            answerIndex
                                          )
                                        }
                                      >
                                        <strong>
                                          <FaTimesCircle className="questiontag-answer-remove" />
                                        </strong>
                                      </button>
                                    )}
                                  </li>

                                  <li>
                                    {x.answers.length === 5 &&
                                    x.answers.length === answerIndex + 1 ? (
                                      <button className="answer-btn" disabled>
                                        <FaPlusCircle className="questiontag-answer-add" />
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
                                          <FaPlusCircle className="questiontag-answer-add" />
                                        </button>
                                      )
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
                    </div>
                  );
                })}

                <button className="questiontag-starttest-button">
                  <a href="/show" className="questiontag-a">
                    Start Test
                  </a>
                </button>
                <br />
                <br />

                <div>
                  <Pagination
                    style={{ marginTop: "150%" }}
                    postsPerPage={postsPerPage}
                    totalPosts={inputList.length}
                    paginate={paginate}
                  />
                </div>
              </div>
            }
          ></Route>

          <Route
            path="/show"
            element={
              <ShowQuestionPage inputList={inputList} alphabet={alphabet} />
            }
          ></Route>
        </Routes>
      </div>
    </Container>
  );
}
