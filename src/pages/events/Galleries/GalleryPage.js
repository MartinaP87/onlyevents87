import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import appStyles from "../../../App.module.css";
import Photo from "../Photos/Photo";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import Asset from "../../../components/Asset";
import PhotoCreateForm from "../Photos/PhotoCreateForm";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import buttonStyle from "../../../styles/Button.module.css";

function GalleryPage(props) {
  const { id } = useParams();
  const { gallery } = props;
  const [photosGallery, setPhotosGallery] = useState({ results: [] });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(
          `events/galleries/photos/?gallery__posted_event=${id}`
        );
        setPhotosGallery(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Button
        className={`${buttonStyle.Button} my-2`}
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        See gallery
      </Button>
      <Collapse in={open}>
        <Container className={appStyles.Content}>
          <h2 className="p-2">{gallery.name}</h2>
          <div className="p-2">
            <PhotoCreateForm setPhotosGallery={setPhotosGallery} id={id} />
          </div>

          {photosGallery.results.length ? (
            <InfiniteScroll
              children={photosGallery.results.map((photo) => (
                <Photo
                  key={photo.id}
                  {...photo}
                  setPhotosGallery={setPhotosGallery}
                />
              ))}
              dataLength={photosGallery.results.length}
              loader={<Asset spinner />}
              hasMore={!!photosGallery.next}
              next={() => fetchMoreData(photosGallery, setPhotosGallery)}
            />
          ) : (
            <p>No photos posted yet</p>
          )}
        </Container>
      </Collapse>
    </>
    // </Col>
  );
}

export default GalleryPage;
