import React from "react";
import { Button, Card } from "react-bootstrap";
import { axiosRes } from "../../../api/axiosDefaults";
import styles from "../../../styles/Event.module.css";

const EventGenre = (props) => {
  const {
    id,
    event_title,
    genre_name,
    setGenres,
  } = props;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/genres/${id}/`);
      setGenres((prevGenres) => ({
        ...prevGenres,
        results: prevGenres.results.filter((genre) => genre.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card className={styles.Event}>
        <Button
          className="align-item-right"
          aria-label="delete"
          onClick={handleDelete}
        >
          <i className="fas fa-trash-alt" />
        </Button>

        <Card.Body>
          {genre_name && (
            <Card.Title className="text-center">{genre_name}</Card.Title>
          )}
          {event_title && <Card.Text>{event_title}</Card.Text>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventGenre;
