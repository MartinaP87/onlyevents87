import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

const GenreCreateForm = (props) => {
  const { id, setGenres } = props;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [genreData, setGenreData] = useState("");

  const handleChange = (event) => {
    setGenreData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post("/categories/genres/", {
        gen_name: genreData,
        category: id,
      });
      history.push(`/categories/${id}`);
      setGenres((prevGenres) => ({
        ...prevGenres,
        results: [data, ...prevGenres.results],
      }));
    } catch (err) {
      console.log(err);
      console.log("oooo", err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setGenreData("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            <Form.Group controlId="genre_name">
              <Form.Label className="d-none">Genre name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Genre name"
                name="genreData"
                className={styles.Input}
                value={genreData}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.gen_name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                This genre already exists.
              </Alert>
            ))}

            <div className="d-inline">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => {}}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                create
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default GenreCreateForm;
