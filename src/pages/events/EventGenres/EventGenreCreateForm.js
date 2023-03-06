import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../../styles/EventCreateEditForm.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { axiosReq } from "../../../api/axiosDefaults";
import { Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";


const EventGenreCreateForm = (props) => {
  const { genresToGet, setGenres } = props;
  const history = useHistory()
  const {id} = useParams()

  const [eventGenre, setEventGenre] = useState({ 
    event: "",
    genre: ""
   });
  const {event, genre} = eventGenre
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.value !== "select the event category") {
    setEventGenre({
      event: id,
      genre: genresToGet.results.filter(
        (genreToGet) => genreToGet.gen_name === e.target.value
      )[0].id
    })}
    else {
      setEventGenre({
        event: "",
        genre: ""
      })
    }
  console.log("EG_GN", eventGenre);
    console.log("ET", e.target.value);
    console.log("GN", genre);
    console.log("EV", event)
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await axiosReq.post("/events/genres/",
      eventGenre);
      history.push(`/events/${id}`);
      setGenres((prevGenres) => ({
        ...prevGenres,
        results: [data, ...prevGenres.results],
      }));
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    
    setEventGenre({ 
      event: "",
      genre: ""
     });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            {genresToGet?.results.length && (
              <Form.Group controlId="genre">
                <Form.Label className="d-none">Genre</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  placeholder="Genre"
                  name="genre"
                  className={styles.Input}
                  value={genre.gen_name}
                  as="select"
                >
                  <option>select the event category</option>
                  {genresToGet?.results.map((genreToGet) => (
                    <option key={genreToGet.id}>{genreToGet.gen_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            {errors.genre?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              onClick={() => history.push(`/events/${id}`)}
            >
              cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              type="submit"
            >
              create
            </Button>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default EventGenreCreateForm;
