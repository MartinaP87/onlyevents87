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

const GenreEditForm = (props) => {
  const { id, gen_name, setGenres, cat_id, setShowEditForm } = props;
  const [genreData, setGenreData] = useState(gen_name);

  const handleChange = (event) => {
    setGenreData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put(`/categories/genres/${id}/`, 
      {gen_name: genreData,
        category: cat_id
      });
      setGenres((prevGenres) => ({
        ...prevGenres,
        results: prevGenres.results.map((genre) => {
          return genre.id === id
            ? {
                ...genre,
                gen_name: genreData
              }
            : genre;
        }),
      }));
      setShowEditForm(false);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} mt-3 d-flex flex-column justify-content-center`}
          >
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
            
            <div className="d-inline">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                  onClick={() => setShowEditForm(false)}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                save
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  )
}

export default GenreEditForm
