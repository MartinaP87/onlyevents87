import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import styles from "../../../styles/PreferenceCreateForm.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { axiosReq } from "../../../api/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useHistory, useParams } from "react-router-dom";

const PreferenceCreateForm = (props) => {
  const { setPreferences } = props;
  const history = useHistory();
  const { id } = useParams();
  const [preference, setPreference] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [errors, setErrors] = useState({});

  const [preferenceChoice, setPreferenceChoice] = useState({
    results: [],
  });

  useEffect(() => {
    // It requests the genres to the API endpoint and
    // stores them in the preferenceChioice variable.
    const fetchPreferences = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/genres/`);
        setPreferenceChoice(data);
      } catch (err) {
        //console.log(err);
      }
    };
    fetchPreferences();
  }, []);

  const handleChange = (event) => {
    // It resets the errors variable, gives the selectValue
    // variable the input value, and if the input value is not
    // empty, it updates the preference variable.
    setErrors({});
    setSelectValue(event.target.value);
    if (event.target.value !== "") {
      setPreference(
        preferenceChoice.results.filter(
          (preferenceChoice) => preferenceChoice.gen_name === event.target.value
        )[0].id
      );
    }
  };

  const handleSubmit = async (event) => {
    // It posts the new data to the API endpoint, redirects
    // to the profile page, updates the preferences variable, and
    // sets the selectValue and preference variables to an empty string.
    event.preventDefault();
    try {
      const { data } = await axiosReq.post("/profiles/preferences/", {
        profile: id,
        genre: preference,
      });
      history.push(`/profiles/${id}`);
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        results: [data, ...prevPreferences.results],
      }));
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setSelectValue("");
    setPreference("");
  };

  return (
    <>
      <Row>
        <Col
          className={`${styles.ButtonAccordion} py-1 px-0 p-md-2`}
          md={7}
          lg={12}
        >
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  name="add preference"
                  as={Button}
                  variant="link"
                  eventKey="0"
                  className={styles.Button}
                  onClick={() => setErrors({})}
                >
                  Add a preference! <i className="fas fa-plus" />
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
                            value={selectValue}
                            as="select"
                          >
                            <option value="" className="d-flex">
                              select your preference
                            </option>
                            {preferenceChoice?.results.map((genre) => (
                              <option
                                className="text-align-center"
                                key={genre.id}
                                value={genre.gen_name}
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
                      {errors && errors.detail && (
                        <Alert variant="warning">{errors.detail}</Alert>
                      )}
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
