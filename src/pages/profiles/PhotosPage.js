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
import { useHistory, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PhotosPage() {
  const { id } = useParams();
  const [photosProfile, setPhotosProfile] = useState({ results: [] });
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(
          `events/galleries/photos/?owner__profile=${id}`
        );
        setPhotosProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    
    <Col className="py-2 p-0 p-lg-2" lg={12}>
      {currentUser ? (<>
      {photosProfile.results.length ? (
        <>
          <div className="d-inline-flex">
            <h1>{photosProfile.results[0].owner}' photos</h1>
            <i
              className="fas fa-arrow-circle-left p-3"
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
          <Container className={appStyles.Content}>
            <InfiniteScroll
              className={styles.Photos}
              children={photosProfile.results.map((photo) => (
                <Photo key={photo.id} {...photo} photosPage/>
              ))}
              dataLength={photosProfile.results.length}
              loader={<Asset spinner />}
              hasMore={!!photosProfile.next}
              next={() => fetchMoreData(photosProfile, setPhotosProfile)}
            />
          </Container>
        </>
      ) : (
        <>
          <p>No photos yet</p>
          <i
            className="fas fa-arrow-circle-left p-3"
            onClick={() => {
              history.goBack();
            }}
          />
        </>
      )}</>):(<h2>Sign in to view this content!</h2>)}
    </Col>
  );
}

export default PhotosPage;
