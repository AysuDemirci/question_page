import React from "react";
import { Container } from "reactstrap";
import QuestionTag from "./Components/QuestionTag";

export default function App() {
  return (
    <div>
      <div className="header">
        <h3>Create a question tag</h3>
      </div>
      <br />
      <Container className="body">
        <QuestionTag />
      </Container>
    </div>
  );
}
