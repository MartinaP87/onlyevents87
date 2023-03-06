import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import appStyles from "../../../App.module.css";

function GalleryPage(props) {
  const { id } = useParams()
  const { gallery } = props;
  const [photos, setPhotos] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(
          `events/galleries/photos/?gallery__posted_event=${id}`);
        setPhotos({ results: [data] });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          Gallery: {gallery.name}
        </Container>
      </Col>
    </Row>
  );
}

export default GalleryPage;
