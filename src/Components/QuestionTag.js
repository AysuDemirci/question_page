import React, { useState } from "react";
import { Button, Input, Row, Col } from "reactstrap";
import AnswerTag from "./AnswerTag";

export default function QuestionTag() {
  const [inputList, setInputList] = useState([{ question: "" }]);

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
    setInputList([...inputList, { question: "" }]);
  };

  return (
    <div>
      <br />
      <h5>If you want to add more questions, please click Add button</h5>
      <br />
      {inputList.map((x, i) => {
        return (
          <div>
            <Col md="6">
             
              <Row>
                <Input
                  style={{ width: "400px", marginBottom: "15px",marginLeft:"13px" }}
                  name="question"
                  placeholder="Enter Question"
                  onChange={(e) => handleInputChange(e, i)}
                  value={x.question}
                />
                <div>
                  <AnswerTag/>
                  {inputList.length !== 1 && (
                    <Button
                      className="question-btn"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </Button>
                  )}
                  {inputList.length - 1 === i && (
                    <Button className="question-btn2" onClick={handleAddClick}>
                      Add
                    </Button>
                  )}
                </div>
                
              </Row>
            </Col>
          </div>
        );
      })}
      
      <br />
    </div>
  );
}
