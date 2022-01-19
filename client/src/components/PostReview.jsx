import { React, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import "../css/postReview.css";
import SearchMovie from "./SearchMovie";
import YarnRating from "./YarnRating";
import useAuth from "../hooks/useAuth";

export default function PostReview(props) {
  const { UserData } = useAuth();

  const [MovieData, setMovieData] = useState({
    owner: "",
    ownerUsername: "",
    title: "",
    content: "",
    yarnRating: 0,
    likeCount: 0,
    commentCount: 0,
    userLikes: [],
    userSaves: [],
    imgURI: "",
    published: "",
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setMovieData({
      ...MovieData,
      published: new Date(),
      owner: UserData.userId,
      ownerUsername: UserData.username,
    });
    console.log(MovieData);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={6}>
            <SearchMovie
              setMovieData={setMovieData}
              MovieData={MovieData}
            ></SearchMovie>
          </Col>
          <Col md={6}>
            <Form
              className="post-main-form"
              onSubmit={(e) => handlePostSubmit(e)}
            >
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Review title"
                  onChange={(e) =>
                    setMovieData({ ...MovieData, title: e.target.value })
                  }
                />
              </Form.Group>
              <YarnRating
                select
                setMovieData={setMovieData}
                MovieData={MovieData}
              ></YarnRating>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <FormControl
                  as="textarea"
                  aria-label="content"
                  className="post-review-textarea"
                  placeholder="Write your review here!"
                  onChange={(e) =>
                    setMovieData({ ...MovieData, content: e.target.value })
                  }
                />
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
