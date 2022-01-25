import { React } from "react";
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
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/reviews.css";
import YarnRating from "./YarnRating";
import spoiler_alert from "../assets/icons/spoiler_alert.png";
import LikeAndSave from "./LikeAndSave";

export default function Reviews() {
  // const [MovieData, setMovieData] = useState({});

  const { isLoading, isError, error, data } = useQuery("reviews", async () => {
    const data = await axiosInstance.get("/reviews");
    return data.data;
  });

  // const filteredReviews = useQuery("filteredReviews", async () => {
  //   const data = await axiosInstance.get("/reviews/filter", {
  //     params: {
  //       q: MovieData.movieId,
  //     },
  //   });
  //   console.log("filtered results: ", data.data);
  //   return data.data;
  // });

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
        <Row>
          {/* <Col md={4}>
            <SearchMovie
              setMovieData={setMovieData}
              MovieData={MovieData}
            ></SearchMovie>
          </Col> */}
          <Col md={12}>
            {data.map((review) => {
              return (
                <Card key={review._id} className="grow">
                  <Card.Img variant="top" src={review.imgURI} />
                  <Card.Body>
                    <div className="card-body-custom-container">
                      <div className="card-left-side">
                        <Card.Title>
                          {review.title}
                          {review.isSpoiler ? (
                            <Image
                              src={spoiler_alert}
                              fluid
                              className="spoiler-alert-image"
                            />
                          ) : (
                            ""
                          )}
                        </Card.Title>
                        <YarnRating rating={review.yarnRating} />
                        <footer className="blockquote-footer">
                          {review.ownerUsername}
                        </footer>
                        <Card.Text>
                          {review.content.slice(0, 100) + " ..."}
                        </Card.Text>
                        <Link to={`/review/${review._id}`}>
                          <Button className="main-button" id="read-more-button">
                            Read more
                          </Button>
                        </Link>
                      </div>
                      <div className="card-right-side">
                        <LikeAndSave />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
