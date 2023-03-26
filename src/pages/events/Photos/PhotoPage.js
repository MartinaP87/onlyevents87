import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import Photo from "./Photo";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      // It requests the photo data to the API endpoint.
      try {
        const { data } = await axiosReq.get(`/events/galleries/photos/${id}`);
        setPhoto({ results: [data] });
      } catch (err) {
        //console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2">
        <Container className="d-flex justify-content-center">
          <Photo {...photo.results[0]} photoPage />
          
        </Container>
      </Col>
    </Row>
  );
};

export default PhotoPage;
