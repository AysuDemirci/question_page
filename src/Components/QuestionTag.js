import React, { useState } from "react";
import {  Input, Row, Col, Container } from "reactstrap";
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
    <Container style={{}}>
      <div>
      <br />
      <br />
      
      <h5>If you want to add more questions, please click Add button</h5>
      <br />
      {inputList.map((x, i) => {
        return (
          <div>
            <Col md="6" style={{ marginLeft: "20px" }}>
              <ul
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
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <Input
                      style={{
                        width: "400px",
                        marginBottom: "15px",
                        marginLeft: "13px",
                      }}
                      name="question"
                      placeholder="Enter Question"
                      onChange={(e) => handleInputChange(e, i)}
                      value={x.question}
                    />
                  </li>
                </ul>
                <AnswerTag />
              </Row>
              <br />
            </Col>
          </div>
        );
      })}

      <br />
    </div>
    </Container>
    
  );
}
