import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/red-upload.png";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";

function EventCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    category: "",
    location: "",
    address: "",
    content: "",
    image: "",
  });
  const { title, date, category, location, address, content, image } =
    eventData;

  const [categoriesToGet, setCategoriesToGet] = useState({ results: [] });
  const imageInput = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get("/categories/");
        console.log(data);
        setCategoriesToGet(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCategory = (event) => {
    setEventData({
      ...eventData,
      category: categoriesToGet.results.filter(
        (categoryToGet) => categoryToGet.cat_name === event.target.value)[0].id
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setEventData({
        ...eventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("image", imageInput.current.files[0]);
    try {
      const { data } = await axiosReq.post("/events/", formData);
      history.push(`/events/${data.id}/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label className="d-none">Event title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Event title"
          name="title"
          className={styles.Input}
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group controlId="date">
        <Form.Label className="d-none">Event date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="date"
          className={styles.Input}
          value={date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.date?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group controlId="category">
        <Form.Label className="d-none">Category</Form.Label>
        <Form.Control
          onChange={handleChangeCategory}
          placeholder="Category"
          name="category"
          className={styles.Input}
          value={category.cat_name}
          as="select"
        >
          <option>select the event category</option>
          {categoriesToGet?.results.map((categoryToGet) => (
            <option key={categoryToGet.id}>{categoryToGet.cat_name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors.category?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group controlId="location">
        <Form.Label className="d-none">Event location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Event location"
          name="location"
          className={styles.Input}
          value={location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.location?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group controlId="address">
        <Form.Label className="d-none">Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          name="address"
          className={styles.Input}
          value={address}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.address?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group controlId="content">
        <Form.Label className="d-none">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Content"
          name="content"
          className={styles.Input}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
