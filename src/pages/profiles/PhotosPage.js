import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/PhotosPage.module.css";
import Photo from "../events/Photos/Photo";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import { useParams } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";

function PhotosPage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const [photos, setPhotos] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(
          `events/galleries/photos/?owner__profile=${id}`
        );
        setPhotos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Col className="py-2 p-0 p-lg-2" lg={12}>
      {photos.results.length ? (
        <>
          <h1>{photos.results[0].owner}' photos</h1>
          <Container className={appStyles.Content}>
            <InfiniteScroll
              className={styles.Photos}
              children={photos.results.map((photo) => (
                <Photo key={photo.id} {...photo} />
              ))}
              dataLength={photos.results.length}
              loader={<Asset spinner />}
              hasMore={!!photos.next}
              next={() => fetchMoreData(photos, setPhotos)}
            />
          </Container>
        </>
      ) : (
        <p>No photos yet</p>
      )}
    </Col>
  );
}

export default PhotosPage;
