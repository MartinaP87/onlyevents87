import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import Photo from "./Photo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/galleries/photos/${id}`);
        setPhoto({ results: [data] });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2">
        <Container className="d-flex justify-content-center">
          <Photo {...photo.results[0]} photoPage />
          <i
            className="fas fa-arrow-circle-left p-3"
            onClick={() => {
              history.goBack();
            }}
          />
        </Container>
      </Col>
    </Row>
  );
};

export default PhotoPage;
