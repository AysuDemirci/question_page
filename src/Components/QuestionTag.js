import React, { useEffect, useState } from "react";
import { Input, Row, Col, Container } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { FaCheck } from "react-icons/fa";
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
    list.splice(index, 1);
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
                <h5 style={{ marginLeft: "35px" }}>
                  If you want to add more questions, please click Add button
                </h5>
                <br />
                {currentInputList.map((x, i) => {
                  return (
                    <div>
                      <Col
                        md="10"
                        style={{
                          marginLeft: "20px",
                          backgroundColor: "#fafafa",
                          borderRadius: "5px",
                        }}
                      >
                        <ul
                          key={x.id}
                          style={{
                            display: "flex",
                            gap: "12px",
                            listStyle: "none",
                            marginLeft: "83%",
                          }}
                        >
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
                          <li>
                            {currentInputList.length !== 1 && (
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
                            style={{
                              listStyle: "none",
                              display: "flex",
                              gap: "20px",
                            }}
                          >
                            <label
                              style={{
                                marginTop: "6px",
                                marginLeft: "5px",
                                fontWeight: "500",
                                fontSize: "17px",
                              }}
                            >
                              {i + indexOfFirstPost + 1}.
                            </label>
                            <li>
                              <Input
                                style={{
                                  width: "700px",
                                  marginBottom: "15px",
                                  display: "flex",
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
                                  <li>
                                    <button
                                      onClick={() => {
                                        correctAnswer(i, answerIndex);
                                      }}
                                      style={{
                                        marginLeft: "35px",
                                        borderRadius: "15px",
                                        border: answer.isCorrectAnswer
                                          ? "2px solid green"
                                          : "2px solid gray",
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <FaCheck
                                        style={{
                                          color: answer.isCorrectAnswer
                                            ? "green"
                                            : "gray",
                                        }}
                                      />
                                    </button>
                                  </li>
                                  <label
                                    style={{
                                      marginLeft: "0px",
                                      marginTop: "5px",
                                      fontSize: "17px",
                                    }}
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
                                          handleAnswerRemoveClick(
                                            i,
                                            answerIndex
                                          )
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
                    </div>
                  );
                })}

                <button
                  style={{
                    border: "none",
                    backgroundColor: "gray",
                    width: "150px",
                    height: "35px",
                    marginLeft: "73%",
                  }}
                >
                  <a
                    href="/show"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Start Test
                  </a>
                </button>
                <br />
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
