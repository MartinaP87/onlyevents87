import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

function EventEditForm() {
  const [errors, setErrors] = useState({});
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
  const history = useHistory();
  const { id } = useParams();
  const [eventGenres, setEventGenres] = useState({ results: [] });
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [
          { data: eventData },
          { data: categoriesToGet },
          { data: eventGenres },
        ] = await Promise.all([
          axiosReq.get(`/events/${id}/`),
          axiosReq.get("/categories/"),
          axiosReq.get(`/events/genres/?event=${id}`),
        ]);
        const {
          title,
          date,
          category,
          location,
          address,
          content,
          image,
          is_owner,
        } = eventData;
        setEventGenres(eventGenres);
        setCategoriesToGet(categoriesToGet);
        setSelectValue(
          categoriesToGet.results.filter(
            (categoryToGet) => categoryToGet.id === category
          )[0].cat_name
        );
        is_owner
          ? setEventData({
              title,
              date,
              category,
              location,
              address,
              content,
              image,
            })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
    console.log(date);
  };

  const deleteEventGenres = () => {
    eventGenres?.results.forEach((event_genre) => {
      try {
        axiosRes.delete(`/events/genres/${event_genre.id}`);
        setEventGenres({ results: [] });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleChangeCategory = (event) => {
    deleteEventGenres();
    setSelectValue(event.target.value);
    if (event.target.value !== "") {
      setEventData({
        ...eventData,
        category: categoriesToGet.results.filter(
          (categoryToGet) => categoryToGet.cat_name === event.target.value
        )[0].id,
      });
    } else {
      setSelectValue("");
      setEventData({
        ...eventData,
        category: "",
      });
    }
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
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/events/${id}`, formData);
      history.push(`/events/${id}/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
    setSelectValue("");
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
          value={selectValue}
          as="select"
        >
          <option value="">select the event category</option>
          {categoriesToGet?.results.map((categoryToGet) => (
            <option key={categoryToGet.id} value={categoryToGet.cat_name}>
              {categoryToGet.cat_name}
            </option>
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
        className={`${btnStyles.Button} ${btnStyles.Purple}`}
        onClick={() => history.goBack()}
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
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Purple} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
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

export default EventEditForm;
