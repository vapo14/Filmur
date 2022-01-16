import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../api/axiosInstance";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
} from "react-bootstrap";
import "../css/reviews.css";
import YarnRating from "./YarnRating";

export default function Reviews() {
  const { isLoading, isError, error, data } = useQuery("reviews", async () => {
    const data = await axiosInstance.get("/reviews");
    return data.data;
  });

  if (isLoading) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Spinner
                style={{
                  width: "8rem",
                  height: "8rem",
                  backgroundColor: "#FF9900",
                }}
                animation="grow"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>An error was encountered</Alert.Heading>
                <p>{error.message}</p>
                <hr />
                <p className="mb-0">
                  Make sure you have an active internet connection, if the
                  problem persists delete cookies and try again.
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container className="review-container">
        {data.map((review) => {
          return (
            <Card key={review._id}>
              <Card.Img variant="top" src={review.imgURI} />
              <Card.Body>
                <Card.Title>{review.title}</Card.Title>
                <YarnRating rating={review.yarnRating} />
                <footer className="blockquote-footer">
                  {review.ownerUsername}
                </footer>
                <Card.Text>{review.content.slice(0, 100) + " ..."}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}
