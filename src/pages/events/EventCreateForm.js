import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.webp";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useRedirect } from "../../hooks/useRedirect";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { NotificationManager } from "react-notifications";

function EventCreateForm() {
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
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
      // It requests the categories to the API endpoint and
      // stores them in the categoriesToGet variable.
      try {
        const { data } = await axiosReq.get("/categories/");
        setCategoriesToGet(data);
      } catch (err) {
        //console.log(err);
      }
    };
    currentUser && fetchCategories();
  }, [currentUser]);

  const handleChange = (event) => {
    // It stores the input data in the eventData variable.
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCategory = (event) => {
    // If the input data is not the empty value, it stores
    // it in the eventData variable, otherwise it sets the
    // category value to an empty string.

    if (event.target.value !== "") {
      setEventData({
        ...eventData,
        category: categoriesToGet.results.filter(
          (categoryToGet) => categoryToGet.cat_name === event.target.value
        )[0].id,
      });
    } else {
      setEventData({
        ...eventData,
        category: "",
      });
    }
  };

  const handleChangeImage = (event) => {
    // If the user uploads another image, it removes the previous
    // image URL from the photoData and replaces it with the new one.
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setEventData({
        ...eventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    // It posts all data to the API endpoint,
    // redirects to the newly created event's page,
    // and displays a notification.
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
      NotificationManager.success(
        `You successfully created the ${title} event!`,
        "Event",
        3000
      );
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      NotificationManager.error(
        `Oops! Something went wrong when creating the event...`,
        "Event error",
        3000
      );
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
          aria-label="event date and time"
          type="datetime-local"
          name="date"
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
          value={category.cat_name}
          as="select"
        >
          <option value="">select the event category</option>
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
        className={`${btnStyles.Button} ${btnStyles.Purple}`}
        onClick={() => history.goBack()}
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
                    <Image
                      className={appStyles.Image}
                      src={image}
                      alt={`${title} image`}
                      rounded
                    />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Purple} btn`}
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
          </Container>
        </Col>
        <Col sm={12} md={5} lg={4} className="p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
