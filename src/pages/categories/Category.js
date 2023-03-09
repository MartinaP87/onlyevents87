import React, { useState } from "react";
import Media from "react-bootstrap/Media";
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CategoryEditForm from "./CategoryEditForm";
import { Link, useHistory } from "react-router-dom";

const Category = (props) => {
  const { cat_name, id, setCategories, categoryPage } = props;
  // const currentUser = useCurrentUser();
  // const admin = currentUser.pk === 1;
  const [showEditForm, setShowEditForm] = useState(false);
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/categories/${id}/`);
      history.push("/categories/");
      setCategories((prevCategories) => ({
        ...prevCategories,
        results: prevCategories.results.filter(
          (category) => category.id !== id
        ),
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
            <CategoryEditForm
              id={id}
              cat_name={cat_name}
              setCategories={setCategories}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <Link to={`/categories/${id}/`}>
              <p>{cat_name}</p>
            </Link>
          )}
        </Media.Body>
        {categoryPage && (
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

export default Category;
