import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../../styles/EventCreateEditForm.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { axiosReq } from "../../../api/axiosDefaults";
import { Accordion, Alert, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const EventGenreCreateForm = (props) => {
  const { genresToGet, setGenres } = props;
  const history = useHistory();
  const { id } = useParams();

  const [genre, setGenre] = useState("")
  // const [prevGenres, setPrevGenres] = useState({results: []})

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     try {
  //       const { data } = await axiosReq.get(`/events/genres/?event=${id}`)
  //       setPrevGenres(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchGenres()
  // }, [id])

  const handleChange = (e) => {
    if (e.target.value !== "select the event genre") {
        setGenre(genresToGet.results.filter(
          (genreToGet) => genreToGet.gen_name === e.target.value
        )[0].id)
    } else {
      setGenre("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (prevGenres.results.map((prevGenre) => {
    //   prevGenre.event !== genre.event && prevGenre.genre !== genre.genre
    // })){
    try {
      const { data } = await axiosReq.post("/events/genres/", 
      { event: id,
       genre: genre});
      history.push(`/events/${id}`);

      setGenres((prevGenres) => ({
        ...prevGenres,
        results: [data, ...prevGenres.results],

      //   results: data.results.reduce((acc, cur) => {
      //     return acc.some((accResult) => accResult === cur)
      //     ? acc
      //     : [...acc, cur];}, prevGenres.results)
      }));
    }  catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setGenre("");
  };


  return (
    <Row>
      <Col className="py-1 p-0 p-md-2" md={7} lg={12}>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Add a preference! <i className="fas fa-plus" />
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container
                    className={"d-flex flex-column justify-content-center p-0"}
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
                          <option className="d-flex">
                            select the event genre
                          </option>
                          {genresToGet?.results.map((genreToGet) => (
                            <option
                              key={genreToGet.id}
                              className="text-align-center"
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

                    <div className="d-inline">
                      <Button
                        className={`${btnStyles.Button} py-1`}
                        type="submit"
                      >
                        create
                      </Button>
                      <Button
                        className={`${btnStyles.Button}`}
                        onClick={() => history.push(`/events/${id}`)}
                      >
                        cancel
                      </Button>
                    </div>
                  </Container>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Row>
  );
};

export default EventGenreCreateForm;
