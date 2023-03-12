import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import GenreEditForm from "./GenreEditForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Genre = (props) => {
  const { gen_name, id, cat_id, setGenres } = props;
  const currentUser = useCurrentUser();
  const admin = currentUser?.pk === 1;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/categories/genres/${id}/`);

      setGenres((prevGenres) => ({
        ...prevGenres,
        results: prevGenres.results.filter((genre) => genre.id !== id),
      }));
    } catch (err) {
      console.log(err);
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
        {
           admin &&
          <MoreDropdown
            handleEdit={() => {
              setShowEditForm(true);
            }}
            handleDelete={handleDelete}
          />
        }
      </Media>
    </>
  );
};

export default Genre;
