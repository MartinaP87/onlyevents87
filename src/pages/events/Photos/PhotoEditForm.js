import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../../styles/EventCreateEditForm.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { axiosReq } from "../../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
// import { useCurrentUser } from "../../../contexts/CurrentUserContext";

function PhotoEditForm() {
  const [errors, setErrors] = useState({});
  const [photoData, setPhotoData] = useState({
    gallery: "",
    title: "",
    image: "",
  });

  const { gallery, title, image } = photoData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/galleries/photos/${id}`);
        const { gallery, title, image, is_owner} = data;
        is_owner
          ? setPhotoData({
              gallery,
              title,
              image,
            })
            
          : history.push(`/events/galleries/photos/${id}/`);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const handleChangeTitle = (event) => {
    setPhotoData({
      ...photoData,
      title: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPhotoData({
        ...photoData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("gallery", gallery);
    formData.append("title", title);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/events/galleries/photos/${id}/`, formData);
      history.push(`/events/galleries/photos/${id}/`);
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
        <Form.Label className="d-none">Photo title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Photo title"
          name="title"
          className={styles.Input}
          value={title}
          onChange={handleChangeTitle}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.push(`/events/galleries/photos/${id}/`)}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
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
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
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

export default PhotoEditForm;
