import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import appStyles from "../../../App.module.css";
import Photo from "../Photos/Photo";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import Asset from "../../../components/Asset";
import PhotoCreateForm from "../Photos/PhotoCreateForm";

function GalleryPage(props) {
  const { id } = useParams();
  const { gallery } = props;
  const [photos, setPhotos] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(
          `events/galleries/photos/?gallery__posted_event=${id}`
        );
        setPhotos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Col className="py-2 p-0 p-lg-2" lg={3}>
      <Container className={appStyles.Content}>
        <h2 className="p-2">{gallery.name}</h2>
        <div className="p-2">
          <PhotoCreateForm setPhotos={setPhotos} id={id} />
        </div>

        {photos.results.length ? (
          <InfiniteScroll
            children={photos.results.map((photo) => (
              <Photo
                key={photo.id}
                {...photo}
                // setPhotos={setPhotos}
              />
            ))}
            dataLength={photos.results.length}
            loader={<Asset spinner />}
            hasMore={!!photos.next}
            next={() => fetchMoreData(photos, setPhotos)}
          />
        ) : (
          <p>No photos posted yet</p>
        )}
      </Container>
    </Col>
  );
}

export default GalleryPage;
