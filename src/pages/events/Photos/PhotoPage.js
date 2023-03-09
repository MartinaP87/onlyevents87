import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../../api/axiosDefaults";
import { Container } from "react-bootstrap";
import Photo from "./Photo";

const PhotoPage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState({ results: [] });

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
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        <Photo {...photo.results[0]} photoPage />
        <Container className={appStyles.Content}></Container>
      </Col>
      <Col lg={3} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
};

export default PhotoPage;
