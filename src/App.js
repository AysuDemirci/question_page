import React from "react";
import { Container, Row } from "reactstrap";
import QuestionTag from "./Components/QuestionTag";

export default function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row>
        <div className="header">
          <h2 style={{ fontWeight: "500", fontSize: "46px" }}>
            Create a question tag
          </h2>
        </div>
      </Row>

      <Row>
        <Container>
          <center>
            <QuestionTag />
          </center>
        </Container>
      </Row>
    </div>
  );
}
