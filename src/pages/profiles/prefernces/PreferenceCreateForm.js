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


const PreferenceCreateForm = (props) => {
  const {preferenceChoice, setPreferences } = props;
  const history = useHistory()
  const {id} = useParams()

  const [preference, setPreference] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    if (event.target.value !== "select your preference") {
    setPreference( preferenceChoice.results.filter(
        (preferenceChoice) => preferenceChoice.gen_name === event.target.value)[0].id)}
    else {
      setPreference("")
    }
  console.log("PR", preference);
    console.log("ET", event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await axiosReq.post("/profiles/preferences/",
      {profile: id,
        genre: preference});
        console.log("DATA", data)
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
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            {preferenceChoice?.results.length && (
              <Form.Group controlId="preference">
                <Form.Label className="d-none">Preference</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  placeholder="Preference"
                  name="preference"
                  className={styles.Input}
                  value={preference.genre_name}
                  as="select"
                >
                  <option>select your preference</option>
                  {preferenceChoice?.results.map((genre) => (
                    <option key={genre.id}>{genre.gen_name}</option>
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
              onClick={() => history.push(`/profiles/${id}`)}
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

export default PreferenceCreateForm;
