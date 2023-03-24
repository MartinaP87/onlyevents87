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
import { Alert } from "react-bootstrap";

const GenreEditForm = (props) => {
  const { id, gen_name, setGenres, cat_id, setShowEditForm } = props;
  const [genreData, setGenreData] = useState(gen_name);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    // It stores the input data in the genresData variable.
    setGenreData(event.target.value);
  };

  const handleSubmit = async (event) => {
    // It sends the genre updates to the API endpoint,
    // updates the genres variable, and closes the edit form.
    event.preventDefault();
    try {
      await axiosReq.put(`/categories/genres/${id}/`, {
        gen_name: genreData,
        category: cat_id,
      });
      setGenres((prevGenres) => ({
        ...prevGenres,
        results: prevGenres.results.map((genre) => {
          return genre.id === id
            ? {
                ...genre,
                gen_name: genreData,
              }
            : genre;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-center">
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`${appStyles.Content} mt-3`}>
            <Form.Group controlId="gen_name">
              <Form.Label className="d-none">Genre name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Genre name"
                name="gen_name"
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
            {errors?.non_field_errors && (
              <Alert variant="warning">possible duplicate</Alert>
            )}
            <div className="d-inline">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                onClick={() => setShowEditForm(false)}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                type="submit"
              >
                save
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default GenreEditForm;
