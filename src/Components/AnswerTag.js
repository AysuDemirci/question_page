import React, { useState } from "react";
import { Input, Row } from "reactstrap";

export default function AnswerTag(props) {
  const {
    inputList,
    alphabet,
    setInputList,
    idCounter,
    setIdCounter,
    setAlphabet,
  } = props;

  const handleAnswerAddClick = (questionIndex) => {
    
    const list = [...inputList];
    const question = list[questionIndex];
    question.answers.push({ id: idCounter + 1, answer: "" });
    setIdCounter(idCounter + 1);
    setInputList(list);
  };
  function handleAnswerChange(e, questionIndex, answerIndex) {
    const { name, value } = e.target;
    const list = [...inputList];
    const question = list[questionIndex];
    const answer = question.answers[answerIndex];
    answer[name] = value;
    setInputList(list);
  }

  const handleAnswerRemoveClick = (questionIndex, answerIndex) => {
    const list = [...inputList];
    const question = list[questionIndex];
    question.answers.splice(answerIndex, 1);
    setInputList(list);
  };

  const alphabetMapping = () => {
    let newChar = String.fromCharCode(
      alphabet[alphabet.length - 1].charCodeAt(0) + 1
    );
    let newChars = alphabet.concat(newChar);
    setAlphabet(newChars);
  };

  
  return (
    <div>
      {inputList.map((x, i) => (
        <div key={i}>
          <Row>
            <ul
              key={i}
              style={{
                display: "flex",
                gap: "20px",
                listStyle: "none",
              }}
            >
              <label style={{ marginLeft: "40px", marginTop: "5px" }}>
                {alphabet[i]}
              </label>
              <li>
                <Input
                  style={{
                    width: "500px",
                    marginBottom: "15px",
                  }}
                  name="answer"
                  placeholder="Enter Answer"
                  onChange={(e) => handleAnswerChange(e, i)}
                  value={x.answer}
                />
              </li>

              <li>
                {inputList.length === 5 && inputList.length - 1 === i ? (
                  <button className="answer-btn" disabled>
                    Add
                  </button>
                ) : (
                  inputList.length - 1 === i && (
                    <button
                      className="answer-btn"
                      onClick={() => {
                        alphabetMapping();
                        handleAnswerAddClick();
                      }}
                    >
                      Add
                    </button>
                  )
                )}
              </li>

              <li>
                {inputList.length !== 1 && (
                  <button
                    className="answer-btn2"
                    onClick={() => handleAnswerRemoveClick(i)}
                  >
                    Remove
                  </button>
                )}
              </li>
            </ul>
          </Row>
        </div>
      ))}
    </div>
  );
}
