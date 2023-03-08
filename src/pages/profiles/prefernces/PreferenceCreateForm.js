import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import styles from "../../../styles/PreferenceCreateForm.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { axiosReq } from "../../../api/axiosDefaults";
import { Alert, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const PreferenceCreateForm = (props) => {
  const { preferenceChoice, setPreferences } = props;
  const history = useHistory();
  const { id } = useParams();
  const [preference, setPreference] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    if (event.target.value !== "select your preference") {
      setPreference(
        preferenceChoice.results.filter(
          (preferenceChoice) => preferenceChoice.gen_name === event.target.value
        )[0].id
      );
    } else {
      setPreference("");
    }
    console.log("PR", preference);
    console.log("ET", event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosReq.post("/profiles/preferences/", {
        profile: id,
        genre: preference,
      });
      console.log("DATA", data);
      history.push(`/profiles/${id}`);
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        results: [data, ...prevPreferences.results],
      }));
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setPreference("");
  };

  return (
    <>
      <Row>
        <Col className="py-1 p-0 p-md-2" md={7} lg={12}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Add a preference! <i className="fas fa-plus"/>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Container
                      className={
                        "d-flex flex-column justify-content-center p-0"
                      }
                    >
                      {preferenceChoice?.results.length && (
                        <Form.Group controlId="preference">
                          <Form.Label className="d-none">Preference</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name="preference"
                            className={styles.Input}
                            value={preference.genre_name}
                            as="select"
                          >
                            <option className="d-flex">
                              select your preference
                            </option>
                            {preferenceChoice?.results.map((genre) => (
                              <option
                                className="text-align-center"
                                key={genre.id}
                              >
                                {genre.gen_name}
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
                      </div>
                    </Container>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </>
  );
};

export default PreferenceCreateForm;
