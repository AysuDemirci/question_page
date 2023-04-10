import React, { useState } from "react";
import { Button, Input, Row } from "reactstrap";

export default function AnswerTag() {
  const [answerList, setAnswerList] = useState([{ answer: "" }]);
  const [alphabet, setAlphabet] = useState(["A"]);

  function handleAnswerChange(e, index) {
    const { name, value } = e.target;
    const list = [...answerList];
    list[index][name] = value;
    setAnswerList(list);
  }

  const handleRemoveClick = (index) => {
    const list = [...answerList];
    list.splice(index, 1);
    setAnswerList(list);
  };

  const handleAddClick = () => {
    setAnswerList([...answerList, { answer: "" }]);
  };

  const alphabetMapping = () => {
    let newChar = String.fromCharCode(
      alphabet[alphabet.length - 1].charCodeAt(0) + 1
    );
    let newChars = alphabet.concat(newChar);
    setAlphabet(newChars);
    if (alphabet.length === 4) {
      alert("you have reached maximum number of answer");
    }
  };

  return (
    <div>
      {answerList.map((x, i) => {
        return (
          <div>
            <Row>
              <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                <label style={{ marginLeft: "15px", marginTop: "5px" }}>
                  {alphabet[i]}
                </label>
                <li>
                  <Input
                    style={{
                      width: "400px",
                      marginBottom: "15px",
                    }}
                    name="answer"
                    placeholder="Enter Answer"
                    onChange={(e) => handleAnswerChange(e, i)}
                    value={x.answer}
                  />
                </li>

                <li>
                  {alphabet.length === 5 && answerList.length - 1 === i ? (
                    <button className="answer-btn" disabled>
                      Add
                    </button>
                  ) : (
                    answerList.length - 1 === i && (
                      <button
                        className="answer-btn"
                        onClick={() => {
                          alphabetMapping();
                          handleAddClick();
                        }}
                      >
                        Add
                      </button>
                    )
                  )}
                </li>

                <li>
                  {answerList.length !== 1 && (
                    <button
                      className="answer-btn2"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              </ul>
            </Row>
          </div>
        );
      })}
    </div>
  );
}
