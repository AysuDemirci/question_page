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
              <Input
                style={{ width: "400px", marginBottom: "15px",marginLeft:"13px" }}
                name="question"
                placeholder="Enter Answer"
                onChange={(e) => handleAnswerChange(e, i)}
                value={x.answer}
              />
              <div>
                {answerList.length !== 1 && (
                  <Button onClick={() => handleRemoveClick(i)}>Remove</Button>
                )}
                {answerList.length - 1 === i && (
                  <Button
                    className="answer-btn"
                    onClick={() => handleAddClick(i)}
                  >
                    Add
                  </Button>
                )}{" "}
              </div>
            </Row>

            {JSON.stringify(answerList)}
          </div>
        );
      })}
    </div>
  );
}
