import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import appStyles from "../../App.module.css";
import Photo from "../events/Photos/Photo";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PhotosPage() {
  const currentUser = useCurrentUser();
  const [photos, setPhotos] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(
          `events/galleries/photos/?owner=${currentUser.username}`
        );
        setPhotos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.username]);

  return (
    
      <Col className="py-2 p-0 p-lg-2" lg={3}>
        <Container className={appStyles.Content}>
          {photos.results.length ? ( 
            <InfiniteScroll
              children={photos.results.map((photo) => (
                <Photo
                  key={photo.id}
                  {...photo}
                />
              ))}
              dataLength={photos.results.length}
              loader={<Asset spinner />}
              hasMore={!!photos.next}
              next={() => fetchMoreData(photos, setPhotos)}
            />
            
          ) : (
            <p>You don't have any photos yet</p>
          )}
        </Container>
      </Col>
   
  );
}

export default PhotosPage;
