import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

// import EventGenreCreateForm from "./EventGenreCreateForm";
import { Container } from "react-bootstrap";
import EventGenre from "./EventGenres/EventGenre";
import GalleryPage from "./Galleries/GalleryPage";
// import EventGenreCreateForm from "./EventGenreCreateForm";
// import EventGenre from "./EventGenre";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const [genres, setGenres] = useState({results: []});
  const [gallery, setGallery] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }, {data: comments}, {data: genres}, {data: gallery}] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/comments/?posted_event=${id}`),
          axiosReq.get(`/events/genres/?event=${id}`),
          axiosReq.get(`events/galleries/${id}`),
        ]);
        setEvent({ results: [event] });
        setComments(comments);
        setGallery(gallery);
        setGenres(genres
          // .results.filter((genre)=> genre.event === id)
          );
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <GalleryPage gallery={gallery}/>
        <PopularProfiles mobile />
        <Event {...event.results[0]} setEvents={setEvent} setGenres={setGenres} eventPage />

        <Container className={appStyles.Content}>
          {genres.results.length ? (
            <InfiniteScroll 
            children={genres.results.map((genre) => (
              <EventGenre key={genre.id} {...genre}
              setGenres={setGenres} 
              />
            ))}
            dataLength={genres.results.length}
            loader={<Asset spinner />}
            hasMore={!!genres.next}
            next={() => fetchMoreData(genres, setGenres)}
            />
          ) : ("No genres yet")}

          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              event={id}
              setEvent={setEvent}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll 
            children={comments.results.map((comment) => (
              <Comment key={comment.id} {...comment}
              setEvent={setEvent}
              setComments={setComments} />
            ))}
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default EventPage;
