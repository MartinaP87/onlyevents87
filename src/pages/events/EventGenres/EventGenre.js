import React from "react";
import Container from "react-bootstrap/Container";
import { axiosRes } from "../../../api/axiosDefaults";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import styles from "../../../styles/EventGenre.module.css";

const EventGenre = (props) => {
  const { id, genre_name, setGenres, owner } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser.username === owner;

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
    <Container className="d-inline-flex px-2 border">
      <Container className={styles.GenreNameContainer}>
        {genre_name && <p className={`${styles.Bold}`}>{genre_name}</p>}
      </Container>
      <Container className="text-align-right p-0">
        {is_owner && (
          <i
            className={`fas fa-trash-alt ${styles.Trash}`}
            aria-label="delete"
            onClick={handleDelete}
          />
        )}
      </Container>
    </Container>
  );
};

export default EventGenre;
