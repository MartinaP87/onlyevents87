import React from "react";
import { Button, Card } from "react-bootstrap";
import { axiosRes } from "../../../api/axiosDefaults";
import styles from "../../../styles/Event.module.css";

const Preference = (props) => {
  const {
    id,
    genre_name,
    is_owner,
    setPreferences,
  } = props;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/profiles/preferences/${id}/`);
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        results: prevPreferences.results.filter((preference) => preference.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card className={styles.Event}>
        {is_owner && 
        <Button
          className="align-item-right"
          aria-label="delete"
          onClick={handleDelete}
        >
          <i className="fas fa-trash-alt" />
        </Button>}

        <Card.Body>
          {genre_name && (
            <Card.Subtitle className="text-center">{genre_name}</Card.Subtitle>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Preference;
