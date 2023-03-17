import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../../styles/EventGenreCreateForm.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { axiosReq } from "../../../api/axiosDefaults";
import Card from "react-bootstrap/Card";
import  Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import { useHistory, useParams } from "react-router-dom";


const EventGenreCreateForm = (props) => {
  const { genresToGet, setGenres } = props;
  const history = useHistory();
  const { id } = useParams();
  const [selectValue, setSelectValue] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSelectValue(e.target.value)
    console.log(e.target.value)
    if (e.target.value !== "") {
      setGenre(
        genresToGet.results.filter(
          (genreToGet) => genreToGet.gen_name === e.target.value
        )[0].id
      );
    setErrors("");
  };}

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.post("/events/genres/", {
        event: id,
        genre: genre,
      });
      history.push(`/events/${id}`);

      setGenres((prevGenres) => ({
        ...prevGenres,
        results: [data, ...prevGenres.results],
      }));
    } catch (err) {
      console.log(err.response);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setSelectValue("")
    setGenre("")
  };

  return (
    <Row className="justify-content-center">
      <Col  md={7} lg={12}>
        <Container
        className={"d-flex flex-column justify-content-center p-0"}>
        <Accordion>
          <Card className="border-0">
            <Card.Header className="py-0">
              <Accordion.Toggle
              className={styles.Purple}
                onClick={() => setErrors("")}
                as={Button}
                variant="link"
                eventKey="0"
              >
                Add a genre! <i className="fas fa-plus" />
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {genresToGet?.results.length && (
                      <Form.Group controlId="genre">
                        <Form.Label className="d-none">Genre</Form.Label>
                        <Form.Control
                          onChange={handleChange}
                          placeholder="Genre"
                          name="genre"
                          className={styles.Input}
                          value={selectValue}
                          as="select"
                        >
                          <option value="" className="d-flex">
                            select the event genre
                          </option>
                          {genresToGet?.results.map((genreToGet) => (
                            <option
                              key={genreToGet.id}
                              className="text-align-center"
                              value={genreToGet.gen_name}
                            >
                              {genreToGet.gen_name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    )}

                    {errors.genre?.map((message, idx) => (
                      <Alert key={idx} variant="warning">
                        {message}
                      </Alert>
                    ))}
                    {errors?.non_field_errors && (
                      <Alert variant="warning">possible duplicate</Alert>
                    )}

                    <div className="d-inline">
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Blue} py-1`}
                        type="submit"
                      >
                        create
                      </Button>
                    </div>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion></Container>
      </Col>
    </Row>
  );
};

export default EventGenreCreateForm;
