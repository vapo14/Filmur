import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import "../css/postReview.css";
import YarnRating from "./YarnRating";

// owner: {
//     type: String,
//     required: true,
//   },
//   ownerUsername: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   yarnRating: {
//     type: Number,
//     required: true,
//   },
//   likeCount: {
//     type: Number,
//     required: true,
//   },
//   commentCount: {
//     type: Number,
//     required: true,
//   },
//   userLikes: {
//     type: [String],
//     required: true,
//   },
//   userSaves: {
//     type: [String],
//     required: true,
//   },
//   imgURI: {
//     type: String,
//     required: true,
//   },
//   published: {
//     type: Date,
//     required: true,
//   },

export default function PostReview() {
  return (
    <div>
      <Container>
        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <Form className="post-main-form">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Review title" />
              </Form.Group>
              <YarnRating select></YarnRating>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <FormControl as="textarea" aria-label="content" />
              </Form.Group>
              <Button className="main-button" type="submit">
                Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
