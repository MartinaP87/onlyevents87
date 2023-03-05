import React from "react";
import { Button, Card } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Event.module.css";

const EventGenre = (props) => {
  const {
    id,
    event,
    genre,
    event_title,
    genre_name,
    genre_category,
    event_category,
    setGenres,
  } = props;

  const handleDelete = async () => {
    try {
        await axiosRes.delete(`/events/genres/${id}/`);
        setGenres((prevGenres) => ({
            ...prevGenres,
            results: prevGenres.results.filter((genre) => genre.id !== id),
        }));
    } catch(err) {
        console.log(err)
    }
};

  return <div>
       <Card className={styles.Event}>
      {/* <Card.Body>
        <Media className="align-item-center justify-content-between">
          <div className="d-flex align-item-center">
            {is_owner && eventPage && <>
              <MoreDropdown 
            handleEdit={handleEdit}
            handleDelete={handleDelete}/></>
            }
          </div>
        </Media>
        <Container>
              <EventGenreCreateForm 
              category={category}
              // setGenres={setGenres}
              />
              </Container>
      </Card.Body> */}
      <Button 
      aria-label="delete"
      onClick={handleDelete}>
       <i className="fas fa-trash-alt" />
       </Button>

      <Card.Body>

        {genre_name && <Card.Title className="text-center">{genre_name}</Card.Title>}
        {event && <Card.Title className="text-center">{event}</Card.Title>}
        {genre && <Card.Subtitle>{genre}</Card.Subtitle>}
        {genre_category && <Card.Subtitle>{genre_category}</Card.Subtitle>}
        {event_category && <Card.Text>{event_category}</Card.Text>}
        {event_title && <Card.Text>{event_title}</Card.Text>}
        {id && <Card.Text>{id}</Card.Text>}
       
      </Card.Body>
    </Card>
  </div>;
};

export default EventGenre;
