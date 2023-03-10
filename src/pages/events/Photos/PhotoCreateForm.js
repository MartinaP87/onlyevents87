import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../../assets/red-upload.png";
import styles from "../../../styles/EventCreateEditForm.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";
import Asset from "../../../components/Asset";
import { axiosReq } from "../../../api/axiosDefaults";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { Alert, Modal } from "react-bootstrap";
import { useRedirect } from "../../../hooks/useRedirect";

function PhotoCreateForm(props) {
  useRedirect("loggedOut");

  const { id, setPhotos } = props;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [photoData, setPhotoData] = useState({
    title: "",
    image: "",
  });
  const { title, image } = photoData;

  const imageInput = useRef(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPhotoData("");
    setErrors("")
  };
  const handleShow = () => setShow(true);

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
    formData.append("title", title);
    formData.append("gallery", id);
    formData.append("image", imageInput.current.files[0]);
    try {
      const { data } = await axiosReq.post(
        "/events/galleries/photos/",
        formData
      );
      setShow(false);
      history.push(`/events/${id}/`);
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: [data, ...prevPhotos.results],
      }));
      setPhotoData("");
      setErrors("");
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

      <Button className={btnStyles.Button} onClick={handleClose}>
        cancel
      </Button>
      <Button className={btnStyles.Button} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a photo!
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Col className="py-2 p-0 p-md-2">
              <Container
                className={`${appStyles.Content} d-flex flex-column justify-content-center`}
              >
                <Form.Group className="text-center">
                  {image ? (
                    <>
                      <figure>
                        <Image
                          className={appStyles.Image}
                          src={image}
                          rounded
                        />
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
              </Container>
            </Col>
            <Col className="d-md-block p-0 p-md-2">
              <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PhotoCreateForm;
