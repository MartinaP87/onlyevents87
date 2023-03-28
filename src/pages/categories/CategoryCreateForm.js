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

const CategoryCreateForm = (props) => {
  const { setCategories } = props;
  const [errors, setErrors] = useState({});
  const [categoryData, setCategoryData] = useState({
    cat_name: "",
  });
  const { cat_name } = categoryData;

  const handleChange = (event) => {
    // It stores the inputs in a variable
    setCategoryData({
      cat_name: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    // It posts the new data to the API endpoint, updates
    // the categories variable, displays a notification, and resets the errors variable.
    event.preventDefault();
    try {
      const { data } = await axiosReq.post("/categories/", categoryData);
      
      setCategories((prevCategories) => ({
        ...prevCategories,
        results: [data, ...prevCategories.results],
      }));
      NotificationManager.success(
        `You created a new ${cat_name} category!`,
        "Category",
        3000
      );
      setErrors({});
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        NotificationManager.error(
          `Oops! Something went wrong when creating the category...`,
          "Category error",
          3000
        );
      }
    }
    // It resets the form
    setCategoryData({
      cat_name: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="d-flex justify-content-center">
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={appStyles.Content}>
            <Form.Group controlId="cat_name">
              <Form.Label className="d-none">Category name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category name"
                name="cat_name"
                className={styles.Input}
                value={cat_name}
                onChange={handleChange}
              />
            </Form.Group>
            {errors && errors.detail && (
              <Alert variant="warning">{errors.detail}</Alert>
            )}
            {errors.cat_name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <div className="d-inline">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                onClick={() => {
                  setCategoryData({
                    cat_name: "",
                  });
                  setErrors({});
                }}
              >
                cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
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

export default CategoryCreateForm;
