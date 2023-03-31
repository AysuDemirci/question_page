import React, { useState } from "react";
import { Button, Input, Row } from "reactstrap";

export default function AnswerTag() {
  const [answerList, setAnswerList] = useState([{ answer: "" }]);

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

  return (
    <div>
      {answerList.map((x, i) => {
        return (
          <div>
            <Row>
              <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
                <li>
                  <Input
                    style={{
                      width: "400px",
                      marginBottom: "15px",
                      marginLeft: "13px",
                    }}
                    name="answer"
                    placeholder="Enter Answer"
                    onChange={(e) => handleAnswerChange(e, i)}
                    value={x.answer}
                  />
                </li>

                <li>
                  {answerList.length - 1 === i && (
                    <Button
                      className="answer-btn2"
                      onClick={handleAddClick}
                    >
                      Add
                    </Button>
                  )}{" "}
                </li>

                <li>
                  {answerList.length !== 1 && (
                    <Button
                      onClick={() => handleRemoveClick(i)}
                      className="answer-btn"
                    >
                      Remove
                    </Button>
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
