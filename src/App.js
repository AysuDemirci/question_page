import React from "react";
import { Col, Container, Row } from "reactstrap";
import QuestionTag from "./Components/QuestionTag";
import SideNavbar from "./Components/SideNavbar";

export default function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row style={{ marginBottom: "70px" }}>
        <div className="header app-row">
          <h2 style={{ fontWeight: "500", fontSize: "46px" }}>
            Create a question tag
          </h2>
        </div>
      </Row>

      <Row>
        <Col md="2">
          <SideNavbar />
        </Col>
        <Col>
          <Container style={{ marginLeft: "20px" }}>
            <br />
            <br />
            <h5 style={{ marginLeft: "35px" }}>
              If you want to add more questions, please click Add button
            </h5>
            <br />
            <QuestionTag />
          </Container>
        </Col>
      </Row>
    </div>
  );
}
