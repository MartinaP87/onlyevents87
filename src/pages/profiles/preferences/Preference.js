import React from "react";
import { Container } from "react-bootstrap";
import { axiosRes } from "../../../api/axiosDefaults";
import styles from "../../../styles/Preference.module.css";

const Preference = (props) => {
  const { id, genre_name, is_owner, setPreferences } = props;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/profiles/preferences/${id}/`);
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        results: prevPreferences.results.filter(
          (preference) => preference.id !== id
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container
        className={`${styles.GenreContainer} d-inline-flex px-2 border`}
      >
        <Container>
          {genre_name && (
            <p className={`${styles.Bold} text-center`}>{genre_name}</p>
          )}
        </Container>
        <Container className="text-align-right p-0">
          {is_owner && (
            <i
              className="fas fa-trash-alt"
              aria-label="delete"
              onClick={handleDelete}
            />
          )}
        </Container>
      </Container>
    </>
  );
};

export default Preference;
