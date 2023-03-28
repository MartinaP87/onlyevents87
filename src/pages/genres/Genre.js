import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import GenreEditForm from "./GenreEditForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { NotificationManager } from "react-notifications";

const Genre = (props) => {
  const { gen_name, id, cat_id, setGenres } = props;
  const currentUser = useCurrentUser();
  const admin = currentUser?.pk === 1;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    // It deletes the genre from the database.
    try {
      await axiosRes.delete(`/categories/genres/${id}/`);

      setGenres((prevGenres) => ({
        ...prevGenres,
        results: prevGenres.results.filter((genre) => genre.id !== id),
      }));
      NotificationManager.success(
        `You successfully deleted the genre!`,
        "Genre delete",
        3000
      );
    } catch (err) {
      //console.log(err);
      NotificationManager.error(
        `Oops! Something went wrong when deleting the genre...`,
        "Genre delete error",
        3000
      );
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          {showEditForm ? (
            <GenreEditForm
              id={id}
              cat_id={cat_id}
              gen_name={gen_name}
              setGenres={setGenres}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{gen_name}</p>
          )}
        </Media.Body>
        {admin && (
          <MoreDropdown
            handleEdit={() => {
              setShowEditForm(true);
            }}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Genre;
