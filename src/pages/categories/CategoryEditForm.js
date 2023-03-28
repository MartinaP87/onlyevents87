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
import Alert from "react-bootstrap/Alert";
import { NotificationManager } from "react-notifications";

const CategoryEditForm = (props) => {
  const { id, cat_name, setCategories, setShowEditForm } = props;
  const [categoryData, setCategoryData] = useState(cat_name);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    // It stores the inputs in a variable.
    setCategoryData(event.target.value);
  };

  const handleSubmit = async (event) => {
    // It sends the data to the API endpoint
    // displays a notification, and
    // updates the categories variable.
    event.preventDefault();
    try {
      await axiosReq.put(`/categories/${id}/`, { cat_name: categoryData });
      setCategories((prevCategories) => ({
        ...prevCategories,
        results: prevCategories.results.map((category) => {
          return category.id === id
            ? {
                ...category,
                cat_name: categoryData,
              }
            : category;
        }),
      }));
      // It closes the edit form.
      setShowEditForm(false);
      NotificationManager.success(
        `You successfully edited the category!`,
        "Category edit",
        3000
      );
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        NotificationManager.error(
          `Oops! Something went wrong when editing the category!`,
          "Category edit error",
          3000
        );
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-center">
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`${appStyles.Content} mt-3`}>
            <Form.Group controlId="cat_name">
              <Form.Label className="d-none">Category name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category name"
                name="cat_name"
                className={styles.Input}
                value={categoryData}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.cat_name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            {errors?.length && (
              <Alert variant="warning">
                possible duplicate or internal server error
              </Alert>
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

export default CategoryEditForm;
